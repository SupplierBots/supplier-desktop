import { Profile } from './Profile';
import { ItemDetails } from './ItemDetails';
export type CheckoutStatus =
  | 'paid'
  | 'failed'
  | 'dup'
  | 'outOfStock'
  | 'queued'
  | '404'
  | '500'
  | 'cca'
  | 'cardinal_queued';

export interface CheckoutData {
  status: CheckoutStatus;
  checkoutTime: number;
  item: ItemDetails;
  ticketDecline: boolean;
  site: 'supreme' | 'palace';
  region: 'eu' | 'us';
}

export interface CheckoutWebhook {
  id: string;
  profile: Profile;
  mode: string;
  item: ItemDetails;
  status: CheckoutStatus;
}

export interface Checkout extends CheckoutData {
  userId: string;
}
