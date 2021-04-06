import { Profile } from './Profile';
import { ItemDetails } from './ItemDetails';
import { Supreme } from './Supreme';

export interface CheckoutData {
  status: Supreme.CheckoutStatus;
  checkoutTime: number;
  item: ItemDetails;
  highTraffic: boolean;
  bParameter: boolean;
  queued: boolean;
  processingAttempt: number;
  checkoutDelay: number;
  taskAttempt: number;
  startTimestamp: string;
  atcTimestamp: string;
  submitTimestamp: string;
  usedProxy: boolean;
  sitekey: string;
  billingErrors: string;
  modifiedButtons: string[];
  safeMode: boolean;
  site: 'desktop' | 'mobile';
  region: 'eu' | 'us';
}

export interface CheckoutWebhook {
  id: string;
  profile: Profile;
  item: ItemDetails;
  status: Supreme.CheckoutStatus;
  safeMode: boolean;
}

export interface Checkout extends CheckoutData {
  userId: string;
}
