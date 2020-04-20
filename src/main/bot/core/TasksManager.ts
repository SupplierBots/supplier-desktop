import { Task } from '../../types/Task';
import { app } from 'electron';
import puppeteer from 'puppeteer-extra';
import devices from 'puppeteer/DeviceDescriptors';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import path from 'path';
import { config } from '../../../config';
import { RunnerState } from '../../types/RunnerState';
import ProxiesManager from './ProxiesManager';
import { Target } from 'puppeteer';
import { IPCMain } from '../../IPC/IPCMain';
import { HybridTask } from '../../types/HybridTask';
import moment, { Moment } from 'moment';
import SupremeTask from '../supreme/browser/SupremeTask';
import { Proxy } from '../../types/Proxy';
import { ProductsMonitor } from '../supreme/ProductsMonitor';
import { HarvesterData } from '../../types/HarvesterData';
import { HarvestersManager } from '../harvesters/HarvestersManager';

class TasksManager {
  public static runner: RunnerState;
  public static hybridTasks: HybridTask[] = [];
  public static scheduledDate: Moment = moment();
  private static timerID: number;

  public static async start(
    tasks: Task[],
    proxies: Proxy[],
    harvesters: HarvesterData[],
    runner: RunnerState,
  ) {
    this.runner = runner;

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

    if (!runner.scheduled) {
      this.startHybridTasks(tasks);
      return;
    }

    const scheduled = moment(runner.time, 'HH:mm:ss');
    if (scheduled.valueOf() < moment().valueOf()) {
      scheduled.add(1, 'day');
    }
    this.scheduledDate = scheduled;

    this.timerID = setInterval(async () => {
      if (moment().valueOf() + 60000 >= this.scheduledDate.valueOf()) {
        clearInterval(this.timerID);
        this.startHybridTasks(tasks);
        IPCMain.resetTimerState();
      }
    }, 1000);
  }

  private static async startHybridTasks(tasks: Task[]) {
    for (let i = 0; i < tasks.length; i++) {
      this.startHybridTask(tasks[i], i);
    }
  }

  private static async startHybridTask(task: Task, index = 0) {
    if (!task.profile) return;
    const page = await this.createBrowser(task, index);
    const product = await IPCMain.getProduct(task.products[0]);
    const profile = await IPCMain.getProfile(task.profile?.value);

    if (!product || !profile) {
      page.close();
      return;
    }
    try {
      const supremeTask = new SupremeTask(page, task, product, profile, this.scheduledDate);
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

    this.hybridTasks.forEach(task => {
      if (!task.page || !task.page.browser().isConnected()) {
        this.clearHybirdTask(task.task.id);
        return;
      }
      cleanUps.push(this.stopHybridTask(task));
    });
    await Promise.all(cleanUps);
  }

  private static async stopHybridTask(task: HybridTask) {
    await task.page.close({
      runBeforeUnload: true,
    });
  }

  private static clearHybirdTask(id: string) {
    this.hybridTasks = this.hybridTasks.filter(t => t.task.id !== id);
  }

  private static async createBrowser(task: Task, index = 0) {
    const { id } = task;
    IPCMain.setTaskActivity(id, true);

    const appData = app.getPath('userData');
    const fetcher = puppeteer.createBrowserFetcher({
      path: path.resolve(appData, '.local-chromium'),
    });

    const executablePath = fetcher.revisionInfo(config.chromiumVersion).executablePath;
    const iPhone = devices['iPhone X'];
    const { height, width, deviceScaleFactor } = iPhone.viewport;
    puppeteer.use(StealthPlugin());

    const args = ['--disable-gpu', '--disable-infobars', `--window-size=${500},${height + 70}`];

    const proxy =
      this.runner.proxies && index > this.runner.localIPTasks ? ProxiesManager.getRandom() : null;

    if (proxy) {
      args.push(`--proxy-server=${proxy.ipPort}`);
    }

    const browser = await puppeteer.launch({
      headless: !config.tasksDebug,
      args,
      executablePath,
    });

    const page = await browser.newPage();

    const [firstPage] = await browser.pages();
    await firstPage.close();

    if (proxy?.userPassAuth) {
      await page.authenticate({
        username: proxy.username,
        password: proxy.password,
      });
    }

    const client = await page.target().createCDPSession();

    client.send('Network.setUserAgentOverride', {
      userAgent:
        '"Mozilla/5.0 (iPhone; CPU iPhone OS 13_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/80.0.3987.149 Mobile/15E148 Safari/604.1"',
      locale: `en-US,en`,
      platform: 'iOS',
    });

    await Promise.all([
      client.send('Emulation.setDeviceMetricsOverride', {
        width,
        height,
        deviceScaleFactor,
        mobile: true,
        screenOrientation: { angle: 0, type: 'portraitPrimary' },
      }),
      client.send('Emulation.setTouchEmulationEnabled', {
        enabled: true,
      }),
      client.send('Emulation.setEmitTouchEventsForMouse', {
        enabled: true,
        configuration: 'desktop',
      }),
    ]);

    browser.on('targetcreated', (target: Target) => {
      if (target.url().includes('devtools')) {
        //browser.close();
      }
    });

    page.on('close', async () => {
      await browser.close();
    });

    browser.on('disconnected', async () => {
      IPCMain.setTaskActivity(id, false);
      this.clearHybirdTask(id);
    });

    this.hybridTasks.push({
      page,
      task,
    });
    //
    return page;
  }
}

export { TasksManager };
