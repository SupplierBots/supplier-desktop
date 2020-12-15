import { IPCMain } from '../../../IPC/IPCMain';
import { Supreme } from '../../../types/Supreme';
import SupremeHybridTask from './SupremeHybridTask';

export function reportCheckout(
  this: SupremeHybridTask,
  { status, page }: Supreme.CheckoutResponse,
) {
  IPCMain.reportCheckout({
    site: 'supreme',
    region: this.region,
    checkoutTime: this.submitTime.valueOf() - this.startTime.valueOf(),
    ticketDecline: !!page,
    bParameter: this.bParameter,
    queued: this.queued,
    processingAttempt: this.processingAttempt,
    checkoutDelay: this.checkoutDelay,
    taskAttempt: this.taskAttempt,
    startTime: this.startTime.toString(),
    atcTime: this.atcTime.toString(),
    submitTime: this.submitTime.toString(),
    usedProxy: this.proxy !== null,
    cardinalBypass: this.bypassCardinal,
    userAgent: this.userAgentData.userAgent,
    item: this.item,
    sitekey: this.sitekey,
    billingErrors: this.billingErrors,
    status,
  });
}
