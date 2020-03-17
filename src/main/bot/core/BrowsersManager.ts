import BrowserInstance from './BrowserInstance';
import { setupBrowser } from '../setup/BrowserSetup';
import { BrowserData } from '../../types/BrowserData';
import { Browser } from 'puppeteer';
import * as R from 'ramda';
import { Task } from '../../types/Task';
import { IPCMain } from '../../IPC/IPCMain';
import SupremeTask from '../supreme/browser/SupremeTask';
import { ProductsMonitor } from '../supreme/ProductsMonitor';

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

      const pages = await browser.pages();
      const page = R.last(pages);
      if (!page) return;

      try {
        const supremeTask = new SupremeTask(page, task);
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
