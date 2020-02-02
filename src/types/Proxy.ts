import { DetailedUserData } from './DetailedUsedData';
export interface Proxy extends DetailedUserData {
  ipPort: string;
  userPassAuth: boolean;
  username: string;
  password: string;
}
