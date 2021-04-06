import { Option } from 'main/types/Option';
import { TaskStatus } from './TaskStatus';

export interface Task {
  id: string;
  isActive: boolean;
  profile: Option | null;
  proxy: Option | null;
  products: string[];
  safeMode: boolean;
  status: TaskStatus;
}
