import { SelectableUserData } from './SelectableUserData';
import { Option } from 'main/types/Option';
import { TaskStatus } from './TaskStatus';

export interface Task extends SelectableUserData {
  site: Option | null;
  profile: Option | null;
  proxy: Option | null;
  browser: Option | null;
  products: string[];
  status: TaskStatus;
  refreshRate: number | string;
  checkoutDelay: number | string;
  stopIfSoldOut: boolean;
  schedule: boolean;
  scheduledDate: string;
  scheduledTime: string;
}
