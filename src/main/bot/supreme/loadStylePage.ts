import { ProductStyle } from './ProductStyle';
import { SupremeTask } from './SupremeTask';

export async function loadStylePage(this: SupremeTask, product: ProductStyle) {
  await product.element.click();
  await this.browser.waitForElement('#details, #img-main', { visible: true });
  await this.browser.waitForXPath(`//p[contains(text(),'${product.name}')]`, {
    visible: true,
  });
  const productImage = await this.document.querySelector('#img-main');
  if (productImage) {
    this.item.image = (await productImage.getAttribute('src'))!.replace(/^\/\//, 'https://');
  }
}
