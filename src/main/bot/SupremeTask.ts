import { Agent, Handler, LocationStatus } from 'secret-agent';
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

  private agent: Agent | null = null;

  public async init() {
    IPCMain.setTaskActivity(this.details.id, true);
    this.agent = (await this.handler.createAgent({ showReplay: false })) as Agent;
    this.agent.on('close', () => {
      IPCMain.setTaskActivity(this.details.id, false);
    });
    await this.agent.goto('https://abrahamjuliot.github.io/creepjs/');
    await this.agent.activeTab.waitForLoad(LocationStatus.DomContentLoaded);
    await this.agent.waitForMillis(5000);
    const res = await this.agent.document.querySelector('#headless-detection-results').innerText;
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
    await this.agent?.close();
  }
}
