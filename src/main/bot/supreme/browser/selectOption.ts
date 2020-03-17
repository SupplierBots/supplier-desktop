import SupremeTask from './SupremeTask';

export async function selectOption(this: SupremeTask, xpath: string, option: string) {
  await this.page.waitForXPath(xpath, { visible: true });
  const [select] = await this.page.$x(xpath);
  const property = await select.getProperty('id');
  const id = await property.jsonValue();
  await this.page.select(`#${id}`, option);
}
