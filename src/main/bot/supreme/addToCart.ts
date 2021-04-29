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

  await this.browser.waitForElement(".button.remove, [value*='remove'], .in-cart, .sold-out", {
    visible: true,
  });

  const removeButton = await this.document.querySelector(
    ".button.remove, [value*='remove'], .in-cart",
  );

  const isSoldOut = removeButton === null;
  if (isSoldOut) {
    this.updateTaskMessage('Color sold out');
  }
  return !isSoldOut;
}
