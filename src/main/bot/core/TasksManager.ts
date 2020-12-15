import { TaskStatusType } from './../../types/TaskStatus';
import { WebhookConfig } from '../../types/WebhookConfig';
import { Task } from '../../types/Task';
import { RunnerState } from '../../types/RunnerState';
import ProxiesManager from './ProxiesManager';
import puppeteer, { Target, Browser } from 'puppeteer-core';
import { IPCMain } from '../../IPC/IPCMain';
import moment, { Moment } from 'moment';
import { Proxy } from '../../types/Proxy';
import { ProductsMonitor } from '../supreme/ProductsMonitor';
import { HarvesterData } from '../../types/HarvesterData';
import { HarvestersManager } from '../harvesters/HarvestersManager';
import { DiscordManager } from '../../DiscordManager';
import SupremeHybridTask from '../supreme/hybrid/SupremeHybridTask';
import * as chrome from 'chrome-launcher';
import { config } from '../../../config';

class TasksManager {
  public static browser: Browser | null = null;
  public static runner: RunnerState;
  public static hybridTasks: SupremeHybridTask[] = [];
  public static scheduledDate: Moment = moment();
  public static isScheduled: boolean = false;
  private static timerID: number;

  public static async start(
    tasks: Task[],
    proxies: Proxy[],
    harvesters: HarvesterData[],
    runner: RunnerState,
    webhook: WebhookConfig,
  ) {
    this.runner = runner;

    DiscordManager.setupWebhook(webhook);
    HarvestersManager.initialize(harvesters);

    // await Promise.all([
    //   HarvestersManager.getCaptchaToken(),
    //   HarvestersManager.getCaptchaToken(),
    //   HarvestersManager.getCaptchaToken(),
    //   HarvestersManager.getCaptchaToken(),
    //   HarvestersManager.getCaptchaToken(),
    // ]);
    // await new Promise(resolve => setTimeout(resolve, 5000));
    // await HarvestersManager.getCaptchaToken();

    ProxiesManager.setProxies(runner.proxies, proxies, runner.proxiesRegion);

    await this.stopAllHybirdTasks();
    this.hybridTasks = [];
    ProductsMonitor.init(2000);
    this.isScheduled = runner.scheduled;

    if (!runner.scheduled) {
      this.startHybridTasks(tasks);
      return;
    }

    this.scheduledDate = moment(runner.time, 'DD/MM HH:mm:ss');

    this.timerID = setInterval(async () => {
      if (moment().valueOf() + 60000 >= this.scheduledDate.valueOf()) {
        clearInterval(this.timerID);
        this.startHybridTasks(tasks);
        IPCMain.resetTimerState();
      }
    }, 1000);
  }

  private static async startHybridTasks(tasks: Task[]) {
    this.browser = await this.createBrowser();
    for (let i = 0; i < tasks.length; i++) {
      this.startHybridTask(tasks[i], i);
    }
  }

  private static async startHybridTask(task: Task, index = 0) {
    if (!task.profile) return;

    IPCMain.updateTaskStatus(task.id, {
      message: 'Preparing',
      type: TaskStatusType.Action,
    });
    const product = await IPCMain.getProduct(task.products[0]);
    const profile = await IPCMain.getProfile(task.profile?.value);

    if (!product || !profile || !this.browser) {
      return;
    }
    try {
      const supremeTask = new SupremeHybridTask(
        this.browser,
        index,
        task,
        product,
        profile,
        this.runner,
      );
      this.hybridTasks.push(supremeTask);
      await supremeTask.init();
    } catch (ex) {
      console.log('Couldnt initiate task: ' + ex);
    }
  }

  public static async stopAllHybirdTasks() {
    HarvestersManager.closeAll();
    ProductsMonitor.unsubscribeAll();
    clearInterval(this.timerID);

    const cleanUps: Promise<void>[] = [];

    this.hybridTasks.forEach(hybrid => {
      if (!hybrid.browser || !hybrid.browser.isConnected()) {
        hybrid.isActive = false;
        this.clearHybirdTask(hybrid.details.id);
        return;
      }
      cleanUps.push(this.stopHybridTask(hybrid));
    });
    await Promise.all(cleanUps);
  }

  private static async stopHybridTask(task: SupremeHybridTask) {
    await task.stop();
  }

  public static clearHybirdTask(id: string) {
    this.hybridTasks = this.hybridTasks.filter(t => t.details.id !== id);
    if (this.hybridTasks.length !== 0) return;
    HarvestersManager.closeAll();
    ProductsMonitor.unsubscribeAll();
    clearInterval(this.timerID);
  }

  public static async createBrowser() {
    const args = [
      `--no-sandbox`,
      `--disable-setuid-sandbox`,
      `--no-first-run`,
      `--disable-sync`,
      `--ignore-certificate-errors`,
      '--no-default-browser-check',
      '--enable-widevine-cdm',
      '--disable-backgrounding-occluded-windows',
      '--disable-background-timer-throttling',
      '--force-fieldtrials=*BackgroundTracing/default/',
      '--disable-blink-features=AutomationControlled',
      '--disable-web-security',
    ];

    var executablePath = chrome.Launcher.getFirstInstallation() ?? 'not-found';

    const browser = await puppeteer.launch({
      headless: !config.tasksDebug,
      ignoreHTTPSErrors: true,
      executablePath,
      args,
    });

    browser.on('targetcreated', (target: Target) => {
      if (target.url().includes('devtools') && !config.tasksDebug) {
        browser.close();
      }
    });

    return browser;
  }
}

export { TasksManager };
