import { Browser, Page, ElementHandle, SetCookie } from 'puppeteer';
import { Profile } from '../../../types/Profile';
import { Logger } from '../Logger';
import { Task } from '../../../types/Task';
import { selectors } from '../browser/selectors';
import moment, { Moment } from 'moment';
import { isMatch } from '../../../bot/core/keywordsManager';
import { Product } from '../../../types/Product';
import { IPCMain } from '../../../IPC/IPCMain';

function generateJSAddressCookie({
  firstName,
  lastName,
  address1,
  address2,
  city,
  postcode,
  email,
  telephone,
}: Profile): SetCookie {
  const value = `${firstName} ${lastName}|${email}|${telephone}|${address1}|${address2}|${city}|undefined|${postcode}|PL|`
    .replace(/ /g, '%20')
    .replace(/@/g, '%40');
  return {
    name: 'js-address',
    value: value,
    domain: '.supremenewyork.com',
  };
}

class SafeSupremeTask {
  public browser: Browser;
  public checkoutDelay: number;
  public profile: Profile | null = null;
  public logger: Logger;
  public atcTime: Moment;

  constructor(readonly page: Page, readonly task: Task, readonly product: Product) {
    this.logger = new Logger(task.id, page);
    this.browser = this.page.browser();
    this.atcTime = moment();
    this.checkoutDelay =
      typeof this.task.checkoutDelay === 'string'
        ? parseInt(this.task.checkoutDelay)
        : this.task.checkoutDelay;
  }

  public init = async () => {
    if (!this.task.profile) return;
    this.profile = (await IPCMain.getProfile(this.task.profile.value)) ?? null;

    this.page.on('request', req => this.logger.reportRequest(req));

    this.page.on('response', async response => {
      this.logger.reportResponse(response);
      const url = response.url();
      if (/.*(checkout|status).json$/.test(url)) {
        const res = (await response.json()) as any;
        if (res.status === 'failed' || res.status === 'outOfStock') {
          //Try again if failed
          return await this.start();
        }
      }
    });
    await this.start();
  };

  public start = async () => {
    this.logger.writeString('Started safe task!');
    await this.prepareCookies();
    this.logger.writeString('Prepared cookies!');
    await this.page.goto('https://www.supremenewyork.com/mobile#categories/new');
    this.page.reload();
    this.logger.writeString('Loaded main page!');
    await this.searchAndOpenProduct();
    await this.addToCart();
    await this.checkout();
  };

  prepareCookies = async () => {
    if (!this.profile) return;
    const cookies = await this.page.cookies('https://www.supremenewyork.com');
    await this.page.deleteCookie(...cookies);
    await this.page.setCookie(generateJSAddressCookie(this.profile));
  };

  searchAndOpenProduct = async () => {
    try {
      await this.page.waitForXPath(selectors.itemSelectable, { visible: true, timeout: 5000 });
    } catch {
      console.log('Shop closed, refreshing...');
      await this.page.reload();
      await this.searchAndOpenProduct();
    }

    const itemsOnPage = await this.page.$x(selectors.itemName);
    const processedItemsOnPage = await Promise.all(
      itemsOnPage.map(async itemOnPage => {
        let text = await itemOnPage.getProperty('textContent');
        let processedText = await text.jsonValue();
        return {
          name: processedText,
          element: itemOnPage,
        };
      }),
    );

    const productsMatched = processedItemsOnPage.filter(item => {
      if (item.name === null) return false;
      return isMatch(item.name as string, this.product.keywords);
    });

    if (productsMatched.length === 0) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await this.page.reload();
      await this.searchAndOpenProduct();
    } else {
      const itemSpan = await productsMatched[0].element;
      const [item] = await itemSpan.$x('ancestor::li');
      await item.tap();
    }
  };

  addToCart = async () => {
    //Waiting for price to make sure we are on product page!
    await this.page.waitForXPath(selectors.price, { visible: true });
    const addToBasketBtn = await this.getVisibleElement(selectors.addBtn);
    addToBasketBtn.tap();
    const checkoutBtn = await this.getVisibleElement(selectors.checkoutBtn);
    this.atcTime = moment();
    await checkoutBtn.tap();
  };

  checkout = async () => {
    if (!this.profile || !this.profile.month || !this.profile.year) return;
    await this.selectOption(
      selectors.cardTypeSelect,
      this.profile.creditCardType?.value ?? 'master',
    );
    await this.selectOption(selectors.monthSelect, this.profile.month.value);
    await this.selectOption(selectors.yearSelect, this.profile.year.value);

    const number = await this.getVisibleElement(selectors.creditCardNumber);
    await number.tap();
    await number.type(this.profile.creditCardNumber);

    const cvv = await this.getVisibleElement(selectors.cvv);
    await cvv.tap();
    await cvv.type(this.profile.cvv.toString());

    const terms = await this.getVisibleElement(selectors.termsLabel, false);
    await terms.tap();
    this.finishOrder();
  };

  finishOrder = async () => {
    const checkoutTime = moment().valueOf() - this.atcTime.valueOf();
    if (checkoutTime < this.checkoutDelay) {
      const delay = this.checkoutDelay - checkoutTime;
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    const processBtn = await this.getVisibleElement(selectors.processBtn, false);
    await processBtn.tap();
  };

  selectOption = async (xpath: string, option: string) => {
    await this.page.waitForXPath(xpath, { visible: true });
    const [select] = await this.page.$x(xpath);
    const property = await select.getProperty('id');
    const id = await property.jsonValue();
    await this.page.select(`#${id}`, option);
  };

  getVisibleElement = async (xpath: string, inViewport = true): Promise<ElementHandle> => {
    await this.page.waitForXPath(xpath, { visible: true });
    const elements = await this.page.$x(xpath);
    let visible: ElementHandle[] = [];
    for (let i = 0; i < elements.length; i++) {
      const box = await elements[i].boundingBox();
      const viewport = await elements[i].isIntersectingViewport();
      if (box !== null && viewport) visible.push(elements[i]);
      if (box !== null && !inViewport) visible.push(elements[i]);
    }
    return visible[0];
  };
}

export { SafeSupremeTask };
