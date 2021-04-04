import { ProductStyle } from './ProductStyle';
import { SupremeTask } from './SupremeTask';
import { isMatch } from './isMatch';
import { LocationStatus } from '@secret-agent/client';

export async function getProduct(this: SupremeTask, refreshCounter = 0): Promise<ProductStyle> {
  const styles: ProductStyle[] = [];
  let matchingProductName: string;

  await this.agent.waitForElement(this.document.querySelector('article div, .inner-article'), {
    waitForVisible: true,
  });

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
      const url = await article.querySelector('a').href;

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
  await this.agent.waitForMillis(1000);
  if (refreshCounter >= 5) {
    const commandId = await this.agent.lastCommandId;
    await this.agent.reload();
    await this.agent.activeTab.waitForLoad(LocationStatus.PaintingStable, {
      sinceCommandId: commandId,
    });
    await this.disableAnimations();
    refreshCounter = 0;
  } else {
    const pathname = await this.document.location.pathname;
    const categoryLink = this.document.querySelector(`li a[href='${pathname}']`);
    const timezoneIdle = this.document.querySelector(`#time-zone-name`);
    await this.agent.waitForElement(categoryLink, { waitForVisible: true });
    try {
      await this.agent.interact({ click: categoryLink }, { move: timezoneIdle });
    } catch {}
  }
  return this.getProduct(++refreshCounter);
}
