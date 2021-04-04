import { UserData } from './UserData';
import { Option } from './Option';

export interface Profile extends UserData {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  country: Option | null;
  region: Option | null;
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  creditCardType: Option | null;
  creditCardNumber: string;
  month: Option | null;
  year: Option | null;
  cvv: string;
}
