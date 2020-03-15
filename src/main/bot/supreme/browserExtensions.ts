import { Profile } from '../../types/Profile';
import { Page, ElementHandle, SetCookie } from 'puppeteer';

export async function selectOption(page: Page, xpath: string, option: string) {
  await page.waitForXPath(xpath, { visible: true });
  const [select] = await page.$x(xpath);
  const property = await select.getProperty('id');
  const id = await property.jsonValue();
  await page.select(`#${id}`, option);
}

export async function getVisibleElement(
  page: Page,
  xpath: string,
  inViewport = true,
): Promise<ElementHandle> {
  await page.waitForXPath(xpath, { visible: true });
  const elements = await page.$x(xpath);
  let visible: ElementHandle[] = [];
  for (let i = 0; i < elements.length; i++) {
    const box = await elements[i].boundingBox();
    const viewport = await elements[i].isIntersectingViewport();
    if (box !== null && viewport) visible.push(elements[i]);
    if (box !== null && !inViewport) visible.push(elements[i]);
  }
  return visible[0];
}

export function generateJSAddressCookie(data: Profile): SetCookie {
  const { firstName, lastName, address1, address2, city, postcode, email, telephone } = data;
  const value = `${firstName} ${lastName}|${email}|${telephone}|${address1}|${address2}|${city}|undefined|${postcode}|PL|`
    .replace(/ /g, '%20')
    .replace(/@/g, '%40');
  return {
    name: 'js-address',
    value: value,
    domain: '.supremenewyork.com',
  };
}

export async function prepareCookies(page: Page, profile: Profile) {
  const cookies = await page.cookies('https://www.supremenewyork.com/');
  await page.deleteCookie(...cookies);
  await page.setCookie(generateJSAddressCookie(profile));
}
