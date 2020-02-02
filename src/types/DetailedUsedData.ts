import { UserData } from 'types/UserData';
import { Option } from './Option';

export interface DetailedUserData extends UserData {
  name: string;
  site: Option | null;
}
