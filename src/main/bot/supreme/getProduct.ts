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
      const header = await article.querySelector('h1, h2, h3, h4, h5, h6');
      if (!header) return;

      const productName = await header.innerText;
      if (matchingProductName && productName !== matchingProductName) return;
      else if (!isMatch(productName, this.product.keywords)) return;

      const paragraph = await article.querySelector('p');
      if (!paragraph) return;

      matchingProductName = productName;
      const articleHTML = await article.innerHTML;
      const styleName = await paragraph.innerText;
      const url = await paragraph.querySelector('a').href;

      styles.push({
        name: styleName,
        url: url,
        element: header,
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
    await this.agent.reload();
    await this.agent.activeTab.waitForLoad(LocationStatus.PaintingStable);
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
