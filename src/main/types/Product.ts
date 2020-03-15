import { SelectableUserData } from './SelectableUserData';
import { Option } from './Option';
import { Keywords } from './Keywords';

export interface Product extends SelectableUserData {
  keywords: Keywords;
  colors: Keywords;
  size: Option | null;
  anySize: boolean;
  anyColor: boolean;
  anySizeOption: Option | null;
  site: Option | null;
  [index: string]: any;
}
