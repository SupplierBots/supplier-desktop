import { Supreme } from '../../types/Supreme';
import { DiscordManager } from '../../DiscordManager';
import { SupremeTask } from './SupremeTask';

export function sendWebhook(this: SupremeTask, { status, id }: Supreme.CheckoutResponse) {
  DiscordManager.sendCheckoutWebhook({
    id: id ?? 'Unknown',
    status,
    item: this.item,
    mode: 'Hybrid',
    profile: this.profile,
  });
}
