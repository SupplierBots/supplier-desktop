import SupremeHybridTask from './SupremeHybridTask';

export async function selectOption(this: SupremeHybridTask, xpath: string, option: string) {
  if (!this.page) return;
  await this.page.waitForXPath(xpath, { visible: true });
  const [select] = await this.page.$x(xpath);
  const property = await select.getProperty('id');
  const id = await property.jsonValue();
  await this.page.select(`#${id}`, option);
}
