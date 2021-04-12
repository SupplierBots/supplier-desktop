import { SupremeTask } from './SupremeTask';

export async function addToCart(this: SupremeTask): Promise<boolean> {
  const button = await this.document.querySelector('[type="submit"], [value*="add to"]');
  if (!button) return false;

  const selectedSize = await this.selectSize();
  if (!selectedSize) return false;

  this.updateTaskMessage('Adding to cart');
  const response = await this.browser.waitForResponse(/add/, async () => {
    await button.click();
    await this.lookForModifiedButtons(['continue', 'confirm', 'proceed', 'accept']);
  });
  const statusCode = await response.statusCode;
  if (statusCode !== 200) {
    return this.addToCart();
  }
  const responseBody = await response.text();
  const isSoldOut = responseBody.includes('sold-out');

  if (isSoldOut) {
    this.updateTaskMessage('Color sold out');
  }
  return !isSoldOut;
}
