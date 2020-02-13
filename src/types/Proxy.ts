import { SelectableUserData } from './SelectableUserData';
export interface Proxy extends SelectableUserData {
  ipPort: string;
  userPassAuth: boolean;
  username: string;
  password: string;
}
