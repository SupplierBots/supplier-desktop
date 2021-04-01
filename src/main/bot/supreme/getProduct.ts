import { ProductStyle } from './ProductStyle';
import { SupremeTask } from './SupremeTask';
import { ISuperNode } from 'awaited-dom/base/interfaces/super';
import { isMatch } from './isMatch';
import { LocationStatus } from '@secret-agent/client';
import { saveQuerySelector } from './agentUtils';

export async function getProduct(this: SupremeTask, refreshCounter = 0): Promise<ProductStyle> {
  const styles: ProductStyle[] = [];
  let matchingProductName: string;

  await this.agent.waitForElement(this.document.querySelector('article div, .inner-article'), {
    waitForVisible: true,
  });

  const articlesCollection = this.document.querySelectorAll('article div, .inner-article');
  const articles: ISuperNode[] = [];
  await articlesCollection.forEach(a => articles.push(a));

  await Promise.all(
    articles.map(async article => {
      const header = await saveQuerySelector(article, 'h1, h2, h3, h4, h5, h6');
      if (!header) return;

      const productName = await header.innerText;
      if (matchingProductName && productName !== matchingProductName) return;
      else if (!isMatch(productName, this.product.keywords)) return;

      const paragraph = await saveQuerySelector(article, 'p');
      if (!paragraph) return;

      matchingProductName = productName;
      const articleHTML = await article.innerHTML;
      const styleName = await paragraph.innerText;
      const url = await paragraph.querySelector('a').href;

      styles.push({
        name: styleName,
        url: url,
        isSoldOut: articleHTML.includes('sold out'),
        element: header,
      });
    }),
  );
  const style = this.selectStyle(styles);
  if (style) {
    return style;
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
