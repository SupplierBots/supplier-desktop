import { Proxy } from '../../types/Proxy';
import moment from 'moment';
import { IPCMain } from '../../IPC/IPCMain';
import { Profile } from '../../types/Profile';
import { SchedulerState } from '../../types/SchedulerState';
import { Task } from '../../types/Task';
import { TaskStatus, TaskStatusType } from '../../types/TaskStatus';
import { addToCart } from './addToCart';
import { checkout } from './checkout';
import { getProduct } from './getProduct';
import { getRemainingStyles } from './getRemainingStyles';
import { injectAddressCookie } from './injectAddressCookie';
import { loadStylePage } from './loadStylePage';
import { lookForModifiedButtons } from './lookForModifiedButtons';
import { parseResponse } from './parseResponse';
import { parseStatus } from './parseStatus';
import { selectSize } from './selectSize';
import { selectStyle } from './selectStyle';
import { ItemDetails } from '../../types/ItemDetails';
import { sendWebhook } from './sendWebhook';
import { reportCheckout } from './reportCheckout';
import _ from 'lodash';
import { BrowserEngine } from '../browserEngines/interfaces/BrowserEngine';
import { Product } from '../../types/Product';
import { scanOtherCategories } from './scanOtherCategories';
import { Delays } from 'main/types/Delays';

export class SupremeTask {
  public constructor(
    readonly browser: BrowserEngine,
    readonly details: Task,
    readonly profile: Profile,
    readonly proxy: Proxy | null,
    readonly scheduler: SchedulerState,
  ) {
    const country = this.profile?.country?.label;
    this.region = country === 'USA' || country === 'Canada' ? 'us' : 'eu';
  }

  public region: 'us' | 'eu';
  public taskAttempt = 0;
  public product!: Product;
  public delays!: Delays;
  public category!: string;
  public get categoryLink() {
    return this.category.toLowerCase().replace('/', '_');
  }

  //Resetable
  public item: ItemDetails = {};
  public soldOutStyles: string[] = [];
  public cardinalURL = '';
  public slug = '';
  public queued = false;
  public highTraffic = false;
  public bParameter = false;
  public billingErrors = 'None';
  public sitekey = '';
  public modifiedButtons: string[] = [];
  public processingAttempt = 0;
  public checkoutDelay = 3000;
  public startTimestamp = moment();
  public submitTimestamp = moment();
  public atcTimestamp = moment();

  public get document() {
    return this.browser.document;
  }

  public async init() {
    const productDetails = await IPCMain.getProduct(this.details.product!.value);
    const delays = await IPCMain.getDelays();
    if (!productDetails || !delays) return;
    this.product = productDetails;
    this.delays = delays;

    if (!this.category) {
      this.category = this.product.category;
    }

    this.taskAttempt++;
    IPCMain.setTaskActivity(this.details.id, true);

    this.checkoutDelay = _.random(this.delays.minCheckout, this.delays.maxCheckout);
    await this.browser.initialize(this.proxy);

    await this.browser.onResponse(this.parseResponse.bind(this));
    await this.browser.onPathChange(path => {
      if (path !== '/' && path !== '/shop' && !path.includes('cart')) return;
      this.retry();
    });
    this.updateTaskMessage('Loading website');
    await this.browser.load(`https://www.supremenewyork.com/shop/all/${this.categoryLink}`);
    await this.injectAddressCookie();
    await this.browser.waitForDOMContentLoaded();
    console.log('Page loaded: ' + Date.now());
    await this.disableAnimations();

    if (this.scheduler.scheduled) {
      const scheduledDate = moment(this.scheduler.time, 'DD/MM HH:mm:ss');
      const timeDifference = scheduledDate.valueOf() - moment().valueOf();
      if (timeDifference > 0) {
        this.updateTaskStatus({ message: 'Waiting', type: TaskStatusType.Action });
        await new Promise(resolve => setTimeout(resolve, timeDifference));
      }
    }

    this.updateTaskStatus({ message: 'Page loaded', type: TaskStatusType.Action });

    this.updateTaskMessage('Waiting for product');
    const primaryStyle = await this.getProduct();
    this.updateTaskMessage('Waiting for resources');
    await this.browser.waitForResourcesLoad();
    this.startTimestamp = moment();
    this.updateTaskMessage('Loading product details');
    await this.loadStylePage(primaryStyle);
    this.item.style = primaryStyle.name;

    let atcSuccess = false;
    while (!atcSuccess) {
      atcSuccess = await this.addToCart();
      if (atcSuccess) continue;
      this.soldOutStyles.push(this.item.style);
      const remainingStyles = await this.getRemainingStyles();
      const nextAvailableStyle = this.selectStyle(remainingStyles);
      if (nextAvailableStyle) {
        this.item.style = nextAvailableStyle.name;
        await this.loadStylePage(nextAvailableStyle);
        continue;
      }
      this.updateTaskMessage('Waiting for restock');
      this.checkoutDelay = this.delays.restocksCheckout;
      await this.browser.waitForMiliseconds(this.delays.refresh);
      this.soldOutStyles = [];
      await this.browser.reload();
      await this.browser.waitForResourcesLoad();
    }
    this.atcTimestamp = moment();
    this.updateTaskMessage('Loading checkout');
    await this.checkout();
    this.submitTimestamp = moment();
  }

  public updateTaskMessage = (message: string) => {
    IPCMain.updateTaskStatus(this.details.id, {
      message,
      type: TaskStatusType.Action,
    });
  };

  public updateTaskStatus = ({ message, type, additionalInfo }: TaskStatus) => {
    IPCMain.updateTaskStatus(this.details.id, {
      message,
      type,
      additionalInfo,
    });
  };

  public async retry() {
    this.item = {};
    this.processingAttempt = 0;
    this.queued = false;
    this.highTraffic = false;
    this.bParameter = false;
    this.cardinalURL = '';
    this.slug = '';
    this.billingErrors = 'None';
    this.soldOutStyles = [];
    this.modifiedButtons = [];
    this.startTimestamp = moment();
    this.submitTimestamp = moment();
    this.atcTimestamp = moment();
    await this.browser.stop();
    await this.init();
  }

  public async stop() {
    await this.browser.stop();
    IPCMain.setTaskActivity(this.details.id, false);
  }

  public async disableAnimations() {
    await this.browser.evaluate('jQuery.fx.off = true;');
  }

  public async autofillInput(xpath: string, value: string) {
    const input = await this.document.queryXPath(xpath);
    await input?.focus();
    for (const character of value.split('')) {
      await input?.pressKey(character);
      await new Promise(resolve => setTimeout(resolve, _.random(35, 65)));
    }
  }

  public selectSize = selectSize;
  public parseResponse = parseResponse;
  public getRemainingStyles = getRemainingStyles;
  public parseStatus = parseStatus;
  public injectAddressCookie = injectAddressCookie;
  public getProduct = getProduct;
  public selectStyle = selectStyle;
  public loadStylePage = loadStylePage;
  public addToCart = addToCart;
  public lookForModifiedButtons = lookForModifiedButtons;
  public checkout = checkout;
  public sendWebhook = sendWebhook;
  public reportCheckout = reportCheckout;
  public scanOtherCategories = scanOtherCategories;
}
