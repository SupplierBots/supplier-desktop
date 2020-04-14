import { Option } from './Option';

export interface HarvesterData {
  id: string;
  accountEmail: string;
  isLogged: boolean;
  isActive: boolean;
  proxy: Option;
}
