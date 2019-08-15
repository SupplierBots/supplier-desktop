import { UserData } from './UserData';
import { Option } from 'react-select/src/filters';
export interface Proxy extends UserData {
  ipPort: string;
  userPassAuth: boolean;
  username: string;
  password: string;
  proxySite: Option | null;
}
