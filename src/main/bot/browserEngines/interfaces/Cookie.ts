import { Moment } from 'moment';

export interface Cookie {
  name: string;
  value: string;
  expires: Moment;
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'Strict' | 'Lax' | 'None';
  domain: string;
  path: string;
}
