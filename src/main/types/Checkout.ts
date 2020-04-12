export type CheckoutStatus = 'paid' | 'failed' | 'dup' | 'outOfStock' | 'queued' | '404' | '500';

export interface CheckoutData {
  status: CheckoutStatus;
  checkoutTime: number;
  items: string[];
  site: 'supreme' | 'palace';
  region: 'eu' | 'us';
}

export interface Checkout extends CheckoutData {
  userId: string;
}
