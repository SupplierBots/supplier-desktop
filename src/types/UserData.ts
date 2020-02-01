import { Option } from './Option';

export interface UserData {
  id: string;
  name: string;
  site: Option | null;
}
