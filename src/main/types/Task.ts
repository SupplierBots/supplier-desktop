import { SelectableUserData } from './SelectableUserData';
import { Option } from 'main/types/Option';
import { TaskStatus } from './TaskStatus';

export interface Task extends SelectableUserData {
  isActive: boolean;
  site: Option | null;
  profile: Option | null;
  products: string[];
  status: TaskStatus;
  refreshRate: number | string;
  checkoutDelay: number | string;
  bypassCardinal?: boolean;
  stopIfSoldOut: boolean;
}
