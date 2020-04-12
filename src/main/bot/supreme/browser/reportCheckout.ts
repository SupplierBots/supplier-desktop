import SupremeTask from './SupremeTask';
import { IPCMain } from '../../../IPC/IPCMain';
import { Supreme } from '../../../types/Supreme';

export function reportCheckout(this: SupremeTask, { status, info }: Supreme.CheckoutResponse) {
  const items = info?.purchases.map(p => p.product_name) ?? this.items;

  IPCMain.reportCheckout({
    site: 'supreme',
    region: this.region,
    checkoutTime: this.submitTime.valueOf() - this.startTime.valueOf(),
    status,
    items,
  });
}
