import { SupremeTask } from './SupremeTask';

export async function addToCart(this: SupremeTask) {
  const button = this.document.querySelector('[type="submit"], [value*="add to"]');
  await this.agent.waitForElement(button, { waitForVisible: true });
  const lastCommandId = await this.agent.activeTab.lastCommandId;
  await this.agent.interact({ click: button });
  await this.lookForModifiedButtons(['continue', 'confirm', 'proceed', 'add', 'accept']);
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
    return false;
  }
  const responseBody = await resource.response.text();
  return !responseBody.includes('sold-out');
}
