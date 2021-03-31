import { Agent, Handler, LocationStatus } from '@secret-agent/client';
import { IPCMain } from '../IPC/IPCMain';
import { Product } from '../types/Product';
import { Profile } from '../types/Profile';
import { RunnerState } from '../types/RunnerState';
import { Task } from '../types/Task';
import { TaskStatus } from '../types/TaskStatus';

export class SupremeTask {
  public constructor(
    readonly handler: Handler,
    readonly details: Task,
    readonly product: Product,
    readonly profile: Profile,
    readonly runner: RunnerState,
  ) {}

  private browser: Agent | null = null;

  public async init() {
    IPCMain.setTaskActivity(this.details.id, true);
    this.browser = (await this.handler.createAgent({ showReplay: false })) as Agent;
    await this.browser.goto('https://abrahamjuliot.github.io/creepjs/');
    await this.browser.activeTab.waitForLoad(LocationStatus.DomContentLoaded);
    await this.browser.waitForMillis(5000);
    const res = await this.browser.document.querySelector('#headless-detection-results').innerText;
    console.log(res);
  }

  public updateTaskStatus = ({ message, type, additionalInfo }: TaskStatus) => {
    IPCMain.updateTaskStatus(this.details.id, {
      message,
      type,
      additionalInfo,
    });
  };

  public async stop() {
    await this.browser?.close();
    IPCMain.setTaskActivity(this.details.id, false);
  }
}
