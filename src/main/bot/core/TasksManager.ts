import { TaskStatusType } from './../../types/TaskStatus';
import { WebhookConfig } from '../../types/WebhookConfig';
import { Task } from '../../types/Task';
import { RunnerState } from '../../types/RunnerState';
import { IPCMain } from '../../IPC/IPCMain';
import moment, { Moment } from 'moment';
import { Proxy } from '../../types/Proxy';
import { HarvesterData } from '../../types/HarvesterData';
import { HarvestersManager } from '../harvesters/HarvestersManager';
import { DiscordManager } from '../../DiscordManager';
import { Handler } from 'secret-agent';
import { SupremeTask } from '../supreme/SupremeTask';

class TasksManager {
  public static runner: RunnerState;
  public static scheduledDate: Moment = moment();
  public static isScheduled: boolean = false;
  private static timerID: NodeJS.Timeout;
  private static tasks: SupremeTask[] = [];
  private static handler: Handler;
  private static proxies: Proxy[];

  public static init() {
    this.handler = new Handler();
  }

  public static async dispose() {
    await this.handler.close();
  }

  public static async start(
    tasks: Task[],
    proxies: Proxy[],
    harvesters: HarvesterData[],
    runner: RunnerState,
    webhook: WebhookConfig,
  ) {
    this.runner = runner;
    this.proxies = proxies;

    DiscordManager.setupWebhook(webhook);
    HarvestersManager.initialize(harvesters);

    // const tokens = await Promise.all([
    //   HarvestersManager.getCaptchaToken(),
    //   HarvestersManager.getCaptchaToken(),
    //   HarvestersManager.getCaptchaToken(),
    //   HarvestersManager.getCaptchaToken(),
    //   HarvestersManager.getCaptchaToken(),
    //   HarvestersManager.getCaptchaToken(),
    //   HarvestersManager.getCaptchaToken(),
    //   HarvestersManager.getCaptchaToken(),
    // ]);
    // console.log('tokens:');
    // console.log(tokens);

    await this.stopAllTasks();
    this.isScheduled = runner.scheduled;

    if (!runner.scheduled) {
      this.startTasks(tasks);
      return;
    }

    this.scheduledDate = moment(runner.time, 'DD/MM HH:mm:ss');

    this.timerID = setInterval(async () => {
      if (moment().valueOf() + 60000 >= this.scheduledDate.valueOf()) {
        clearInterval(this.timerID);
        this.startTasks(tasks);
        IPCMain.resetTimerState();
      }
    }, 1000);
  }

  private static async startTasks(tasks: Task[]) {
    for (let i = 0; i < tasks.length; i++) {
      this.startTask(tasks[i], i);
    }
  }

  private static async startTask(task: Task, index = 0) {
    if (!task.profile) return;

    IPCMain.updateTaskStatus(task.id, {
      message: 'Preparing',
      type: TaskStatusType.Action,
    });
    const product = await IPCMain.getProduct(task.products[0]);
    const profile = await IPCMain.getProfile(task.profile?.value);
    const proxy = task.proxy?.value ? (await IPCMain.getProxy(task.proxy.value)) ?? null : null;

    if (!product || !profile) {
      return;
    }
    try {
      const supremeTask = new SupremeTask(this.handler, task, product, profile, proxy, this.runner);
      this.tasks.push(supremeTask);
      supremeTask.init();
    } catch (ex) {
      IPCMain.setTaskActivity(task.id, false);
      console.log('Task exception: ' + ex);
    }
  }

  public static async stopAllTasks() {
    HarvestersManager.closeAll();
    clearInterval(this.timerID);
    await Promise.all(this.tasks.map(task => task.stop()));
    this.tasks = [];
  }
}

export { TasksManager };
