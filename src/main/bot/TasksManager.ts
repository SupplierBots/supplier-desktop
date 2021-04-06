import { TaskStatusType } from '../types/TaskStatus';
import { Task } from '../types/Task';
import { SchedulerState } from '../types/SchedulerState';
import { IPCMain } from '../IPC/IPCMain';
import moment, { Moment } from 'moment';
import { Proxy } from '../types/Proxy';
import { HarvestersManager } from './harvesters/HarvestersManager';
import { DiscordManager } from '../DiscordManager';
import { SupremeTask } from './supreme/SupremeTask';
import { SecretAgentEngine } from './browserEngines/secret-agent/SecretAgentEngine';
import { PlaywrightEngine } from './browserEngines/playwright/PlaywrightEngine';
import { TasksManagerPayload } from '../types/TasksManagerPayload';

class TasksManager {
  public static scheduler: SchedulerState;
  public static scheduledDate: Moment = moment();
  public static isScheduled: boolean = false;
  private static timerID: NodeJS.Timeout;
  private static tasks: SupremeTask[] = [];
  private static proxies: Proxy[];

  public static async start({
    tasks,
    proxies,
    harvesters,
    scheduler,
    webhook,
  }: TasksManagerPayload) {
    this.scheduler = scheduler;
    this.proxies = proxies;

    DiscordManager.setupWebhook(webhook);
    HarvestersManager.initialize(harvesters);

    if (tasks.some(t => !t.safeMode)) {
      await SecretAgentEngine.startHandler();
    }

    if (tasks.some(t => t.safeMode)) {
      await PlaywrightEngine.startHandler();
    }

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

    this.isScheduled = scheduler.scheduled;

    if (!scheduler.scheduled) {
      this.startTasks(tasks);
      return;
    }

    this.scheduledDate = moment(scheduler.time, 'DD/MM HH:mm:ss');

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
    if (!task.profile || !task.product) return;

    IPCMain.updateTaskStatus(task.id, {
      message: 'Preparing',
      type: TaskStatusType.Action,
    });
    const profile = await IPCMain.getProfile(task.profile?.value);
    const proxy = task.proxy?.value
      ? this.proxies.find(p => p.id === task.proxy?.value) ?? null
      : null;

    if (!profile) {
      return;
    }
    try {
      const supremeTask = new SupremeTask(
        task.safeMode ? new PlaywrightEngine() : new SecretAgentEngine(),
        task,
        profile,
        proxy,
        this.scheduler,
      );
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