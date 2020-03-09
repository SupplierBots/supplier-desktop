import BrowserInstance from './BrowserInstance';
import { setupBrowser } from './setup/BrowserSetup';
import { BrowserData } from 'types/BrowserData';
import { Browser } from 'puppeteer';
import * as R from 'ramda';
import { Task } from 'types/Task';
import ProductsMonitor, { PageRegion } from './palace/ProductsMonitor';
import { palaceTask } from './palace/palaceTask';
import { PalaceMonitors } from 'types/PalaceMonitors';
import { mainWindow } from '../main';

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
      mainWindow?.webContents.send('BROWSER_STATE_CHANGE', { id: data.id, status: false });
    }
  }

  public async startTasks(tasks: Task[]) {
    const monitors: PalaceMonitors = {
      eu: new ProductsMonitor(PageRegion.Eu),
      us: new ProductsMonitor(PageRegion.Us),
    };

    tasks.forEach(async (task, index) => {
      if (!task.browser) return;
      const browser = await BrowserInstance(task.browser?.value, index);
      this.browsers.push(browser);
      if (task.site?.value === 'palace') {
        palaceTask(browser, task, monitors);
      }
    });
  }

  public async stopAll() {
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
