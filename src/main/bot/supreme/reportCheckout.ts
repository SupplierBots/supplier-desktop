import { IPCMain } from '../../IPC/IPCMain';
import { Supreme } from '../../types/Supreme';
import { SupremeTask } from './SupremeTask';

export function reportCheckout(this: SupremeTask, { status, page }: Supreme.CheckoutResponse) {
  IPCMain.reportCheckout({
    site: 'desktop',
    region: this.region,
    checkoutTime: this.submitTimestamp.valueOf() - this.startTimestamp.valueOf(),
    highTraffic: this.highTraffic,
    bParameter: this.bParameter,
    queued: this.queued,
    processingAttempt: this.processingAttempt,
    checkoutDelay: this.checkoutDelay,
    taskAttempt: this.taskAttempt,
    startTimestamp: this.startTimestamp.toString(),
    atcTimestamp: this.atcTimestamp.toString(),
    submitTimestamp: this.submitTimestamp.toString(),
    usedProxy: this.proxy !== null,
    item: this.item,
    sitekey: this.sitekey,
    billingErrors: this.billingErrors,
    status,
  });
}
