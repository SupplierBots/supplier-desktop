import { SelectableUserData } from './SelectableUserData';
import { Product } from 'types/Product';
import { Option } from 'types/Option';
export interface Task extends SelectableUserData {
  site: Option | null;
  profile: Option | null;
  proxy: Option | null;
  browser: Option | null;
  products: Product[];
  refreshRate: number | string;
  checkoutDelay: number | string;
  stopIfSoldOut: boolean;
  schedule: boolean;
  scheduledDate: string;
  scheduledTime: string;
}
