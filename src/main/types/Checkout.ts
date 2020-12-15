import { Profile } from './Profile';
import { ItemDetails } from './ItemDetails';
import { Supreme } from './Supreme';

export interface CheckoutData {
  status: Supreme.CheckoutStatus;
  checkoutTime: number;
  item: ItemDetails;
  ticketDecline: boolean;
  bParameter: boolean;
  queued: boolean;
  processingAttempt: number;
  checkoutDelay: number;
  taskAttempt: number;
  startTime: string;
  atcTime: string;
  submitTime: string;
  usedProxy: boolean;
  cardinalBypass: boolean;
  userAgent: string;
  sitekey: string;
  billingErrors: string;
  site: 'supreme' | 'palace';
  region: 'eu' | 'us';
}

export interface CheckoutWebhook {
  id: string;
  profile: Profile;
  mode: string;
  item: ItemDetails;
  status: Supreme.CheckoutStatus;
}

export interface Checkout extends CheckoutData {
  userId: string;
}
