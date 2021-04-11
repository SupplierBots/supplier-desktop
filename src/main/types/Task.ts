import { Option } from 'main/types/Option';
import { UserDefinedKeywords } from './Keywords';
import { TaskStatus } from './TaskStatus';

export interface Task {
  id: string;
  product: Option | null;
  colors: UserDefinedKeywords;
  size: Option | null;
  anySize: boolean;
  anyColor: boolean;
  anySizeOption: Option | null;
  isActive: boolean;
  profile: Option | null;
  proxy: Option | null;
  status: TaskStatus;
}
