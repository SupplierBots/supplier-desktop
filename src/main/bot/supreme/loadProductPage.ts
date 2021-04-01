import { ProductStyle } from './ProductStyle';
import { SupremeTask } from './SupremeTask';

export async function loadProductPage(this: SupremeTask, product: ProductStyle) {
  await this.agent.interact({ click: product.element });
  const productPageElement = this.document.querySelector('#details, #img-main');
  await this.agent.waitForElement(productPageElement, { waitForVisible: true });
}
