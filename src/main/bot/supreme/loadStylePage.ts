import { ProductStyle } from './ProductStyle';
import { SupremeTask } from './SupremeTask';

export async function loadStylePage(this: SupremeTask, product: ProductStyle) {
  await this.agent.interact({ click: product.element });
  const productPageElement = this.document.querySelector('#details, #img-main');
  await this.agent.waitForElement(productPageElement, { waitForVisible: true });
  const styleName = await this.queryXPath(`//p[contains(text(),'${product.name}')]`);
  await this.agent.waitForElement(styleName, { waitForVisible: true });
  const productImage = await this.document.querySelector('#img-main');
  if (productImage) {
    this.item.image = (await productImage.getAttribute('src'))!.replace('//', 'https://');
  }
}
