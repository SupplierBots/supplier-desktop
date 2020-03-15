import { SelectableUserData } from './SelectableUserData';
import { Product } from 'main/types/Product';
import { Option } from 'main/types/Option';
import { TaskStatus } from './TaskStatus';

export interface Task extends SelectableUserData {
  site: Option | null;
  profile: Option | null;
  proxy: Option | null;
  browser: Option | null;
  products: Product[];
  status: TaskStatus;
  refreshRate: number | string;
  checkoutDelay: number | string;
  stopIfSoldOut: boolean;
  schedule: boolean;
  scheduledDate: string;
  scheduledTime: string;
}
