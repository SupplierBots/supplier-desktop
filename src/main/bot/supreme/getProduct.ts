import { ProductStyle } from './ProductStyle';
import { SupremeTask } from './SupremeTask';
import { isMatch } from './isMatch';
import { IPCMain } from '../../IPC/IPCMain';

export async function getProduct(this: SupremeTask, refreshCounter = 0): Promise<ProductStyle> {
  const productDetails = await IPCMain.getProduct(this.details.product!.value);
  if (productDetails) {
    this.product = productDetails;
  }

  const styles: ProductStyle[] = [];
  let matchingProductName: string;

  await this.browser.waitForElement('li a', { visible: true });
  const articles = [...(await this.document.querySelectorAll('article div, .inner-article'))];
  await Promise.all(
    articles.map(async article => {
      const nameElement = await article.querySelector(
        'h1, h2, h3, h4, h5, h6, div:nth-of-type(1) > a:not([style])',
      );
      if (!nameElement) return;

      const productName = await nameElement.innerText;
      if (matchingProductName && productName !== matchingProductName) return;
      else if (!isMatch(productName, this.product.keywords)) return;

      const colorElement = await article.querySelector('p, div:nth-of-type(2) > a:not([style])');
      if (!colorElement) return;

      matchingProductName = productName;
      this.item.name = matchingProductName;
      const articleHTML = await article.innerHTML;
      const styleName = await colorElement.innerText;
      const urlElement = await article.querySelector('a');
      const url = (await urlElement?.getAttribute('href'))!;

      styles.push({
        name: styleName,
        url: url,
        element: nameElement,
        isSoldOut: articleHTML.includes('sold out'),
      });
    }),
  );
  if (styles.length > 0) {
    const primaryStyle = this.selectStyle(styles);
    return primaryStyle ?? styles[0];
  }
  await this.browser.waitForMiliseconds(this.delays.refresh);
  if (refreshCounter >= 5 || articles.length === 0) {
    const scannedCategory = await this.scanOtherCategories();
    if (scannedCategory) {
      this.category = scannedCategory;
    }
    await this.browser.load(`https://www.supremenewyork.com/shop/all/${this.categoryLink}`);
    await this.browser.waitForDOMContentLoaded();
    await this.disableAnimations();
    refreshCounter = 0;
  } else {
    try {
      const pathname = await this.browser.pathname;
      await this.browser.waitForElement(`li a[href='${pathname}']`, { visible: true });
      const categoryLink = await this.document.querySelector(`li a[href='${pathname}']`);
      const pathRegex = new RegExp(pathname);
      await this.browser.waitForResponse(pathRegex, async () => {
        await categoryLink?.click();
      });
    } catch {}
  }
  return await this.getProduct(++refreshCounter);
}
