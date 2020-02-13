import { UserData } from 'types/UserData';
import { Option } from './Option';

export interface SelectableUserData extends UserData {
  site: Option | null;
}
