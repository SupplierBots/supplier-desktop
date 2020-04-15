import { Harvester } from './Harvester';
import * as _ from 'lodash';
import { HarvesterData } from '../../types/HarvesterData';
import { app, screen } from 'electron';
import { config } from '../../../config';
import path from 'path';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Target } from 'puppeteer';
import { IPCMain } from '../../IPC/IPCMain';
import { setupHarvester } from './setupHarvester';

class HarvestersManager {
  private static sitekey = '6LeWwRkUAAAAAOBsau7KpuC9AV-6J8mhw4AjC3Xz';
  private static harvesters: Harvester[] = [];

  public static async initialize(harvestersData: HarvesterData[]) {
    this.harvesters = [];

    harvestersData.forEach(async (harvester, index) => {
      const page = await this.createBrowser(harvester, index);
      const instance = new Harvester(page, harvester, this.sitekey);
      await instance.init();
      this.harvesters.push(instance);
    });
  }

  public static async getCaptchaToken(sitekey = this.sitekey): Promise<string> {
    const availableHarvester = this.harvesters.find(h => h.ready && !h.solving);

    if (!availableHarvester) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return this.getCaptchaToken();
    }

    const token = await availableHarvester.getCaptchaToken(sitekey);
    return token;
  }

  public static async closeAll() {
    this.harvesters.forEach(harvester => {
      harvester.page.browser().close();
    });
  }

  public static async setupHarvester(harvesterData: HarvesterData) {
    try {
      const page = await this.createBrowser(harvesterData);
      setupHarvester(page, harvesterData.id);
    } catch {
      IPCMain.harvesterStateChange(harvesterData.id, false);
    }
  }

  public static async disableHarvester(id: string) {
    this.harvesters = this.harvesters.filter(h => h.data.id !== id);
  }

  public static createBrowser = async ({ id, proxy }: HarvesterData, index = 0) => {
    IPCMain.harvesterStateChange(id, true);

    const appData = app.getPath('userData');
    const fetcher = puppeteer.createBrowserFetcher({
      path: path.resolve(appData, '.local-chromium'),
    });

    const executablePath = fetcher.revisionInfo(config.chromiumVersion).executablePath;
    const userDataDirectory = path.resolve(appData, id);
    puppeteer.use(StealthPlugin());

    const screenSize = screen.getPrimaryDisplay().workAreaSize;
    const maxHorizontaly = Math.floor(screenSize.width / 500);
    const y = Math.floor(index / maxHorizontaly + 1) - 1;
    const x = index % maxHorizontaly;

    const args = [
      '--no-sandbox',
      '--disable-gpu',
      '--disable-infobars',
      `--user-data-dir=${userDataDirectory}`,
      `--window-size=${500},${550}`,
      `--window-position=${500 * x},${(550 + 82) * y}`,
    ];

    const proxyData = proxy.value !== 'none' ? await IPCMain.getProxy(proxy.value) : null;

    if (proxyData) {
      args.push(`--proxy-server=${proxyData.ipPort}`);
    }

    const browser = await puppeteer.launch({
      headless: false,
      ignoreHTTPSErrors: true,
      ignoreDefaultArgs: ['--enable-automation'],
      args,
      executablePath,
    });

    const page = await browser.newPage();
    const [firstPage] = await browser.pages();
    await firstPage.close();

    if (proxyData?.userPassAuth) {
      await page.authenticate({
        username: proxyData.username,
        password: proxyData.password,
      });
    }

    page.on('close', async () => {
      await browser.close();
    });

    browser.on('targetcreated', (target: Target) => {
      if (target.url().includes('devtools')) {
        browser.close();
      }
    });

    browser.on('disconnected', async () => {
      HarvestersManager.disableHarvester(id);
      IPCMain.harvesterStateChange(id, false);
    });

    return page;
  };
}

export { HarvestersManager };
