import { SupremeTask } from './SupremeTask';
import _ from 'lodash';

export async function disableAnimations(this: SupremeTask) {
  await this.browser.evaluate('jQuery.fx.off = true;');
}

export async function waitForTicket(this: SupremeTask) {
  const script = await this.document.querySelector("script[src*='ticket']");
  if (!script) return;
  await this.browser.waitForResponse(/ticket.js/);
  console.log('Ticket loaded: ' + Date.now());
}
