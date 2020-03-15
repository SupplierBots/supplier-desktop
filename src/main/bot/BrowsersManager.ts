import BrowserInstance from './BrowserInstance';
import { setupBrowser } from './setup/BrowserSetup';
import { BrowserData } from '../types/BrowserData';
import { Browser } from 'puppeteer';
import * as R from 'ramda';
import { Task } from '../types/Task';
import { startSupremeTask } from './supreme/startSupremeTask';
import { IPCMain } from '../IPC/IPCMain';
import { ProductsMonitor } from './supreme/ProductsMonitor';

class BrowsersManager {
  private static instance: BrowsersManager;
  private browsers: Browser[] = [];
  private constructor() {}

  public static getInstance(): BrowsersManager {
    this.instance = this.instance ?? new BrowsersManager();
    return this.instance;
  }

  public async setup(data: BrowserData) {
    try {
      const browser = await BrowserInstance(data.id);
      this.browsers.push(browser);
      const pages = await browser.pages();
      const page = R.last(pages);
      if (!page) {
        browser.close();
        return;
      }
      setupBrowser(page, data.id);
    } catch {
      IPCMain.browserStateChange(data.id, false);
    }
  }

  public async startTasks(tasks: Task[]) {
    ProductsMonitor.init(2000);
    tasks.forEach(async (task, index) => {
      if (!task.browser) return;
      const browser = await BrowserInstance(task.browser?.value, index);
      this.browsers.push(browser);
      startSupremeTask(browser, task);
    });
  }

  public async stopAll() {
    ProductsMonitor.unsubscribeAll();
    const cleanUps: Promise<void>[] = [];
    this.browsers.forEach(b => {
      if (!b.isConnected()) return;
      cleanUps.push(b.close());
    });
    this.browsers = [];
    await Promise.all(cleanUps);
  }
}

export default BrowsersManager;
