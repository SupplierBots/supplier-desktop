import BrowserInstance from './BrowserInstance';
import { setupBrowser } from '../setup/BrowserSetup';
import { BrowserData } from '../../types/BrowserData';
import { Browser } from 'puppeteer';
import * as R from 'ramda';
import { Task } from '../../types/Task';
import { IPCMain } from '../../IPC/IPCMain';
import SupremeTask from '../supreme/browser/SupremeTask';
import { ProductsMonitor } from '../supreme/ProductsMonitor';
import fs from 'fs-extra';
import path from 'path';
import { app } from 'electron';

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
    await fs.ensureDir(path.resolve(app.getAppPath(), 'logs'));
    ProductsMonitor.init(2000);

    tasks.forEach(async (task, index) => {
      if (!task.browser) return;

      const browser = await BrowserInstance(task.browser?.value, index);
      const product = await IPCMain.getProduct(task.products[0]);
      this.browsers.push(browser);

      const pages = await browser.pages();
      const page = R.last(pages);
      if (!page || !product) return;

      try {
        const supremeTask = new SupremeTask(page, task, product);
        await supremeTask.init();
      } catch {}
    });
  }

  public async stopAll() {
    ProductsMonitor.unsubscribeAll();

    const cleanUps: Promise<void>[] = [];

    this.browsers.forEach(b => {
      if (!b.isConnected()) return;
      cleanUps.push(this.closeBrowser(b));
    });

    this.browsers = [];
    await Promise.all(cleanUps);
  }

  private async closeBrowser(browser: Browser) {
    for (let page of await browser.pages()) {
      await page.close({
        runBeforeUnload: true,
      });
    }
    await browser.close();
  }
}

export default BrowsersManager;
