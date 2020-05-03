import SupremeTask from './SupremeTask';
import { Supreme } from '../../../types/Supreme';
import { DiscordManager } from '../../../DiscordManager';

export function sendWebhook(this: SupremeTask, { status, id }: Supreme.CheckoutResponse) {
  DiscordManager.sendCheckoutWebhook({
    id: id ?? 'Unknown',
    status,
    item: this.item,
    mode: 'Hybrid',
    profile: this.profile,
  });
}
