import { SupremeTask } from './SupremeTask';

export async function addToCart(this: SupremeTask): Promise<boolean> {
  const button = await this.document.querySelector('[type="submit"], [value*="add to"]');
  if (!button) return false;

  const selectedSite = await this.selectSize();
  if (!selectedSite) return false;

  this.updateTaskMessage('Adding to cart');
  const lastCommandId = await this.agent.activeTab.lastCommandId;
  await this.agent.interact({ click: button });
  await this.lookForModifiedButtons(['continue', 'confirm', 'proceed', 'accept']);
  const [resource] = await this.agent.waitForResource(
    {
      url: /add/,
    },
    {
      sinceCommandId: lastCommandId,
    },
  );
  const statusCode = await resource.response.statusCode;
  if (statusCode !== 200) {
    return this.addToCart();
  }
  const responseBody = await resource.response.text();
  const isSoldOut = responseBody.includes('sold-out');

  if (isSoldOut) {
    this.updateTaskMessage('Color sold out');
  }
  return !isSoldOut;
}
