import { HarvesterData } from './HarvesterData';
import { Proxy } from './Proxy';
import { SchedulerState } from './SchedulerState';
import { Task } from './Task';
import { WebhookConfig } from './WebhookConfig';

export interface TasksManagerPayload {
  tasks: Task[];
  proxies: Proxy[];
  harvesters: HarvesterData[];
  scheduler: SchedulerState;
  webhook: WebhookConfig;
}
