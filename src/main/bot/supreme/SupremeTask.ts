import { Proxy } from '../../types/Proxy';
import moment from 'moment';
import { IPCMain } from '../../IPC/IPCMain';
import { Product } from '../../types/Product';
import { Profile } from '../../types/Profile';
import { RunnerState } from '../../types/RunnerState';
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

export class SupremeTask {
  public constructor(
    readonly browser: BrowserEngine,
    readonly details: Task,
    readonly product: Product,
    readonly profile: Profile,
    readonly proxy: Proxy | null,
    readonly runner: RunnerState,
  ) {
    const country = this.profile?.country?.label;
    this.region = country === 'USA' || country === 'Canada' ? 'us' : 'eu';
  }

  public region: 'us' | 'eu';
  public taskAttempt = 0;

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
  public processingAttempt = 0;
  public checkoutDelay = 3000;
  public startTimestamp = moment();
  public submitTimestamp = moment();
  public atcTimestamp = moment();

  public get document() {
    return this.browser.document;
  }

  public async init() {
    // const org = this.product.keywords.positive;
    // this.product.keywords.positive = ['SRASAAS'];
    // setTimeout(() => (this.product.keywords.positive = org), 15000);

    this.taskAttempt++;
    IPCMain.setTaskActivity(this.details.id, true);

    this.checkoutDelay = _.random(3000, 5000);
    await this.browser.initialize(this.proxy);

    this.browser.onClose(() => {
      IPCMain.setTaskActivity(this.details.id, false);
    });

    await this.browser.onResponse(this.parseResponse.bind(this));

    await this.browser.load('https://www.supremenewyork.com/shop/all/accessories');
    await this.injectAddressCookie();
    await this.browser.waitForDOMContentLoaded();
    console.log('Page loaded: ' + Date.now());
    await this.disableAnimations();

    if (this.runner.scheduled) {
      const scheduledDate = moment(this.runner.time, 'DD/MM HH:mm:ss');
      const timeDifference = scheduledDate.valueOf() - moment().valueOf();
      if (timeDifference > 0) {
        this.updateTaskStatus({ message: 'Waiting', type: TaskStatusType.Action });
        await new Promise(resolve => setTimeout(resolve, timeDifference));
      }
    }

    this.updateTaskStatus({ message: 'Page loaded', type: TaskStatusType.Action });

    this.updateTaskMessage('Waiting for product');
    const product = await this.getProduct();
    await this.waitForTicket();
    this.startTimestamp = moment();
    this.updateTaskMessage('Loading product details');
    await this.loadStylePage(product);
    this.item.style = product.name;

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
      this.checkoutDelay = 2500;
      await this.browser.waitForMiliseconds(1000);
      this.soldOutStyles = [];
      await this.browser.reload();
      await this.waitForTicket();
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
    this.startTimestamp = moment();
    this.submitTimestamp = moment();
    this.atcTimestamp = moment();
    await this.stop();
    await this.init();
  }

  public async stop() {
    await this.browser.stop();
  }

  public async disableAnimations() {
    await this.browser.evaluate('jQuery.fx.off = true;');
  }

  public async waitForTicket() {
    const script = await this.document.querySelector("script[src*='ticket']");
    if (!script) return;
    await this.browser.waitForResponse(/ticket.js/);
    console.log('Ticket loaded: ' + Date.now());
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
}
