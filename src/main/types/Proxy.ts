import { Option } from './Option';
import { UserData } from './UserData';
export interface Proxy extends UserData {
  ipPort: string;
  userPassAuth: boolean;
  username: string;
  password: string;
  region: Option | null;
}
