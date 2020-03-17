import { ElementHandle } from 'puppeteer';
import SupremeTask from './SupremeTask';

export async function getVisibleElement(
  this: SupremeTask,
  xpath: string,
  inViewport = true,
): Promise<ElementHandle> {
  await this.page.waitForXPath(xpath, { visible: true });
  const elements = await this.page.$x(xpath);

  let visible: ElementHandle[] = [];

  for (let element of elements) {
    const box = await element.boundingBox();
    const viewport = await element.isIntersectingViewport();
    if (box !== null && viewport) visible.push(element);
    if (box !== null && !inViewport) visible.push(element);
  }

  return visible[0];
}
