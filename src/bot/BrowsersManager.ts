import { setActive } from './../store/browsers/actions';
import store from 'store/configureStore';
import BrowserInstance from './BrowserInstance';
import { setupBrowser } from './setup/BrowserSetup';
import { BrowserData } from 'types/BrowserData';
import { Browser } from 'puppeteer';
import * as R from 'ramda';
import { Task } from 'components/TaskEditor/FormDetails';

class BrowsersManager {
  private static instance: BrowsersManager;
  private browsers: Browser[] = [];
  private constructor() {}

  public static getInstance(): BrowsersManager {
    this.instance = this.instance ?? new BrowsersManager();
    return this.instance;
  }

  public async setup(data: BrowserData) {
    store.dispatch(setActive(data.id, true));
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
      store.dispatch(setActive(data.id, false));
    }
  }

  public async startTasks(tasks: Task[]) {
    tasks.forEach(async (task, index) => {
      if (!task.browser) return;
      const browser = BrowserInstance(task.browser?.value, index);
    });
  }

  public async closeAll() {
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
