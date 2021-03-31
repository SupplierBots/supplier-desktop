import { Handler, LocationStatus } from '@secret-agent/client';
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

  public async init() {
    IPCMain.setTaskActivity(this.details.id, true);
    const agent = await this.handler.createAgent({ showReplay: false });
    await agent.goto('https://abrahamjuliot.github.io/creepjs/');
    await agent.activeTab.waitForLoad(LocationStatus.DomContentLoaded);
    await agent.waitForMillis(5000);
    const res = await agent.document.querySelector('#headless-detection-results').innerText;
    console.log(res);
  }

  public updateTaskStatus = ({ message, type, additionalInfo }: TaskStatus) => {
    IPCMain.updateTaskStatus(this.details.id, {
      message,
      type,
      additionalInfo,
    });
  };
}
