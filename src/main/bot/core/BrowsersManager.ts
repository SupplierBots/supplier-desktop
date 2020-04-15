import BrowserInstance from './BrowserInstance';

import { HarvesterData } from '../../types/HarvesterData';
import { Browser } from 'puppeteer';
import * as R from 'ramda';
import { Task } from '../../types/Task';
import { IPCMain } from '../../IPC/IPCMain';
import SupremeTask from '../supreme/browser/SupremeTask';
import { ProductsMonitor } from '../supreme/ProductsMonitor';
import fs from 'fs-extra';
import path from 'path';
import { app } from 'electron';
import { RunnerState } from '../../types/RunnerState';
import moment, { Moment } from 'moment';
import { Proxy } from '../../types/Proxy';
import { HarvestersManager } from '../harvesters/HarvestersManager';

class BrowsersManager {
  private static instance: BrowsersManager;
  private static timerID: number;
  private browsers: Browser[] = [];
  private constructor() {}

  public static getInstance(): BrowsersManager {
    this.instance = this.instance ?? new BrowsersManager();
    return this.instance;
  }

  public async setup(data: HarvesterData) {
    // try {
    //   const browser = await BrowserInstance(data.id);
    //   this.browsers.push(browser);
    //   const pages = await browser.pages();
    //   const page = R.last(pages);
    //   if (!page) {
    //     browser.close();
    //     return;
    //   }
    //   setupBrowser(page, data.id);
    // } catch {
    //   IPCMain.harvesterStateChange(data.id, false);
    // }
  }

  public async startTasks(tasks: Task[], runner: RunnerState) {
    //await fs.ensureDir(path.resolve(app.getAppPath(), 'logs'));
    // const scheduledDate = moment(`${runner.date} ${runner.time}`, 'DD/MM/YYYY HH:mm:ss');
    // if (!runner.enabled) {
    //   this.initializeTasks(tasks, scheduledDate);
    //   return;
    // }
    // BrowsersManager.timerID = setInterval(() => {
    //   if (moment().valueOf() + 60000 >= scheduledDate.valueOf()) {
    //     clearInterval(BrowsersManager.timerID);
    //     this.initializeTasks(tasks, scheduledDate);
    //   }
    // }, 1000);
  }

  public async initializeTasks(tasks: Task[], scheduledDate: Moment) {
    // HarvestersManager.initialize([
    //   {
    //     accountEmail: 'testemail@gmail.com',
    //     isActive: true,
    //     isLogged: true,
    //     id: 'testHarvester',
    //     proxy: null,
    //   },
    // ]);
    // let token = await HarvestersManager.getCaptchaToken();
    // console.log(token);
    // const proxies: Proxy[] = [];
    // tasks.forEach(async (task, index) => {
    //   if (!task.browser || !task.proxy || !task.profile) return;
    //   const proxy = task.proxy.label !== 'None' ? await IPCMain.getProxy(task.proxy.value) : null;
    //   if (proxy) proxies.push(proxy);
    //   const browser = await BrowserInstance(task.browser?.value, proxy, index);
    //   const product = await IPCMain.getProduct(task.products[0]);
    //   const profile = await IPCMain.getProfile(task.profile?.value);
    //   this.browsers.push(browser);
    //   const pages = await browser.pages();
    //   const page = R.last(pages);
    //   if (!page || !product || !profile) {
    //     browser.close();
    //     return;
    //   }
    //   try {
    //     const supremeTask = new SupremeTask(page, task, product, profile, scheduledDate);
    //     await supremeTask.init();
    //   } catch {}
    // });
    // IPCMain.resetTimerState();
    // const timeDifference = scheduledDate.valueOf() - moment().valueOf();
    // await new Promise(resolve => setTimeout(resolve, timeDifference - 10000));
    // ProductsMonitor.init(2000, proxies);
  }

  public async stopAll() {
    ProductsMonitor.unsubscribeAll();
    clearInterval(BrowsersManager.timerID);
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
