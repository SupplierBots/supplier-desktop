import {
  BrowserContext,
  ChromiumBrowser,
  Frame,
  Page,
  Response as EngineResponse,
} from 'playwright-core';
import { Proxy } from '../../../types/Proxy';
import { BrowserEngine } from '../interfaces/BrowserEngine';
import { Cookie } from '../interfaces/Cookie';
import { Response } from '../interfaces/Response';
import { chromium } from 'playwright-core';
import * as chrome from 'chrome-launcher';
import { config } from '../../../../config';
import { PlaywrightResponse } from './PlaywrightResponse';
import { PlaywrightDocument } from './PlaywrightDocument';

export class PlaywrightEngine implements BrowserEngine {
  private static browser: ChromiumBrowser;
  public document!: PlaywrightDocument;

  get pathname(): Promise<string> {
    return this.page.evaluate('document.location.pathname');
  }

  private page!: Page;
  private context!: BrowserContext;
  private responsesListener?: (response: EngineResponse) => void;
  private pathListener?: (frame: Frame) => void;

  static async startHandler() {
    if (!PlaywrightEngine.browser) {
      const executablePath = chrome.Launcher.getFirstInstallation();
      const args = ['--disable-blink-features=AutomationControlled'];

      if (!config.tasksDebug) {
        args.push('--window-position=9999,9999');
      }

      PlaywrightEngine.browser = await chromium.launch({
        headless: false,
        ignoreDefaultArgs: ['--disable-component-extensions-with-background-pages'],
        args,
        executablePath,
      });
    }
  }

  async initialize(proxy: Proxy | null): Promise<void> {
    const proxyConfig = await this.getProxyConfig(proxy);
    this.context = await PlaywrightEngine.browser.newContext({
      proxy: proxyConfig ?? undefined,
      viewport: null,
    });
    this.page = await this.context.newPage();
    this.document = new PlaywrightDocument(this.page);
  }

  async getProxyConfig(proxy: Proxy | null) {
    if (!proxy) return null;
    const { ipPort: server } = proxy;
    if (!proxy.userPassAuth) {
      return { server };
    }
    const { username, password } = proxy;
    return { server, username, password };
  }

  async stop(): Promise<void> {
    if (this.responsesListener) {
      const listener = this.responsesListener;
      this.page.off('response', listener);
    }
    if (this.pathListener) {
      const listener = this.pathListener;
      this.page.off('framenavigated', listener);
    }
    await this.context.close();
  }
  async evaluate(source: string): Promise<void> {
    await this.page.evaluate(source);
  }
  async load(url: string): Promise<void> {
    await this.page.goto(url);
  }
  async setCookie({
    domain,
    path,
    name,
    value,
    expires,
    httpOnly,
    secure,
    sameSite,
  }: Cookie): Promise<void> {
    await this.context.addCookies([
      {
        domain,
        path,
        name,
        value,
        httpOnly,
        secure,
        sameSite,
        expires: expires.valueOf(),
      },
    ]);
  }
  click(x: number, y: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async waitForElement(selector: string, { visible }: { visible: boolean }): Promise<void> {
    await this.page.waitForSelector(selector, { state: visible ? 'visible' : 'attached' });
  }
  async waitForXPath(xPath: string, options: { visible: boolean }): Promise<void> {
    await this.waitForElement(xPath, options);
  }
  async waitForResponse(url: string | RegExp, callBefore?: () => Promise<void>): Promise<Response> {
    await callBefore?.();
    const response = await this.page.waitForResponse(url);
    return new PlaywrightResponse(response);
  }

  async waitForMiliseconds(miliseconds: number): Promise<void> {
    await this.page.waitForTimeout(miliseconds);
  }
  async waitForDOMContentLoaded(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }
  async waitForResourcesLoad(): Promise<void> {
    await this.page.waitForLoadState('load');
  }
  async reload(): Promise<void> {
    await this.page.reload();
  }

  async onResponse(listenFn: (event: Response) => void): Promise<void> {
    const listener = (response: EngineResponse) => {
      listenFn(new PlaywrightResponse(response));
    };
    this.responsesListener = listener;
    this.page.on('response', listener);
  }
  onClose(callback: () => void): void {
    this.context.on('close', callback);
  }

  async onPathChange(listenFn: (url: string) => void): Promise<void> {
    const listener = async (frame: Frame) => {
      if (frame !== this.page.mainFrame()) return;
      const pathname = await this.pathname;
      listenFn(pathname);
    };
    this.pathListener = listener;
    this.page.on('framenavigated', listener);
  }
}
