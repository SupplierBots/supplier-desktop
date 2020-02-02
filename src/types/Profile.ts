import { DetailedUserData } from './DetailedUsedData';
import { Option } from './Option';

export interface Profile extends DetailedUserData {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  country: Option | null;
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  creditCardType: Option | null;
  creditCardNumber: string;
  month: Option | null;
  year: Option | null;
  cvv: string;
  site: Option | null;
}