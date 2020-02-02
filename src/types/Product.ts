import { DetailedUserData } from './DetailedUsedData';
import { Option } from './Option';
import { Keywords } from './Keywords';

export interface Product extends DetailedUserData {
  keywords: Keywords;
  colors: Keywords;
  size: Option | null;
  anySize: boolean;
  anyColor: boolean;
  anySizeOption: Option | null;
  site: Option | null;
}
