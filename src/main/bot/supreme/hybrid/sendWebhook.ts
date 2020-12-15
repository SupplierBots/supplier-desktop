import { Supreme } from '../../../types/Supreme';
import { DiscordManager } from '../../../DiscordManager';
import SupremeHybridTask from './SupremeHybridTask';

export function sendWebhook(this: SupremeHybridTask, { status, id }: Supreme.CheckoutResponse) {
  DiscordManager.sendCheckoutWebhook({
    id: id ?? 'Unknown',
    status,
    item: this.item,
    mode: 'Hybrid',
    profile: this.profile,
  });
}
