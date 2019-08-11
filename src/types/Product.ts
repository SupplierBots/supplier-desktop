import { UserData } from './UserData';
import { Option } from './Option';
import { Keywords } from './Keywords';

export interface Product extends UserData {
  keywords: Keywords;
  colors: Keywords;
  size: Option | null;
  anySize: boolean;
  anyColor: boolean;
  anySizeOption: Option | null;
  productSite: Option | null;
}
