import { HarvesterData } from 'main/types/HarvesterData';
import { BrowserContext, Page, Route } from 'playwright-core';
import { Harvester } from '../interfaces/Harvester';
import { getPageContent } from './pageContent';
import { chromium } from 'playwright-core';
import { IPCMain } from '../../../IPC/IPCMain';
import { app, screen } from 'electron';
import * as chrome from 'chrome-launcher';
import path from 'path';
import _ from 'lodash';

export class PlaywrightHarvester implements Harvester {
  public sitekey: string;
  public isSolving = false;
  public isReady = false;

  private page!: Page;
  private context!: BrowserContext;

  constructor(readonly data: HarvesterData, sitekey = '') {
    this.sitekey = sitekey;
  }

  async initialize(index = 0): Promise<void> {
    IPCMain.harvesterStateChange(this.data.id, true);

    const appData = app.getPath('userData');
    const executablePath = chrome.Launcher.getFirstInstallation();
    const userDataDirectory = path.resolve(appData, this.data.id);

    const screenSize = screen.getPrimaryDisplay().workAreaSize;
    const maxHorizontaly = Math.floor((screenSize.width + 150) / 500);
    const y = Math.floor(index / maxHorizontaly + 1) - 1;
    const x = index % maxHorizontaly;

    const proxy = await this.getProxyConfig();

    this.context = await chromium.launchPersistentContext(userDataDirectory, {
      headless: false,
      args: [
        `--window-size=${500},${600}`,
        `--window-position=${500 * x},${(550 + 82) * y}`,
        '--disable-blink-features=AutomationControlled',
      ],
      ignoreDefaultArgs: ['--disable-component-extensions-with-background-pages'],
      proxy: proxy ?? undefined,
      viewport: null,
      executablePath,
    });
    this.page = await this.context.newPage();

    await this.page.route(/supremenewyork/, this.parseRoute);

    this.page.on('close', async () => {
      await this.context.close();
      IPCMain.harvesterStateChange(this.data.id, false);
    });
  }

  async getProxyConfig() {
    if (this.data.proxy.value === 'none') return null;
    const proxyData = await IPCMain.getProxy(this.data.proxy.value);
    if (!proxyData) return null;
    const { ipPort: server } = proxyData;
    if (!proxyData.userPassAuth) {
      return { server };
    }
    const { username, password } = proxyData;
    return { server, username, password };
  }

  async load() {
    this.isReady = false;
    this.page.goto('https://www.supremenewyork.com/checkout', { waitUntil: 'domcontentloaded' });
    this.page.evaluate(`setEmail('${this.data.accountEmail}');`);
    await new Promise(resolve => setTimeout(resolve, 2500));
    this.isReady = true;
  }

  async close(): Promise<void> {
    await this.context.close();
  }

  async getToken(sitekey: string): Promise<string> {
    if (sitekey !== this.sitekey) {
      this.sitekey = sitekey;
      await this.load();
    }

    this.isSolving = true;
    await this.page.evaluate('executeCaptcha();');
    await this.page.waitForFunction(`isTokenReady()`, {
      timeout: 0,
    });

    const token = (await this.page.evaluate('getToken()')) as string;

    this.isSolving = false;
    return token;
  }

  public parseRoute = (route: Route) => {
    if (
      route
        .request()
        .url()
        .includes('supremenewyork')
    ) {
      route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: getPageContent(this.sitekey),
      });
    } else {
      route.continue();
    }
  };

  async setup(): Promise<void> {
    IPCMain.setHarvesterEmail(this.data.id, `Not-Logged-${_.takeRight(this.data.id, 5).join('')}`);

    await this.context.clearCookies();
    await this.page.goto(
      'https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin&hl=en',
    );

    this.page.on('load', async () => {
      const url = this.page.url();
      if (!url.includes('https://myaccount.google.com/')) return;

      await this.page.waitForSelector("//div[contains(text(),'@gmail.com')]", {
        state: 'attached',
      });

      const accountEmailElements = await this.page.$$("//div[contains(text(),'@gmail.com')]");
      if (accountEmailElements.length < 1) return;
      const [accountEmailNode] = accountEmailElements;

      const emailProperty = await accountEmailNode.getProperty('innerText');
      let email = (await emailProperty.jsonValue()) as string;

      const sameEmails = await IPCMain.getSameEmails(email);

      if (sameEmails && sameEmails.length > 0) {
        email += ` (${sameEmails.length + 1})`;
      }
      IPCMain.setHarvesterEmail(this.data.id, email);
      this.close();
    });
  }
}
