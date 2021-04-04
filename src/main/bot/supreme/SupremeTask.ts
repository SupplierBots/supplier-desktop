import { Proxy } from '../../types/Proxy';
import moment from 'moment';
import { Agent, Handler, IAgentCreateOptions, LocationStatus } from 'secret-agent';
import { IPCMain } from '../../IPC/IPCMain';
import { Product } from '../../types/Product';
import { Profile } from '../../types/Profile';
import { RunnerState } from '../../types/RunnerState';
import { Task } from '../../types/Task';
import { TaskStatus, TaskStatusType } from '../../types/TaskStatus';
import { addToCart } from './addToCart';
import {
  disableAnimations,
  evaluate,
  fillInput,
  queryXPath,
  selectOption,
  waitForTicket,
} from './agentUtils';
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

export class SupremeTask {
  public constructor(
    readonly handler: Handler,
    readonly details: Task,
    readonly product: Product,
    readonly profile: Profile,
    readonly proxy: Proxy | null,
    readonly runner: RunnerState,
  ) {
    const country = this.profile?.country?.label;
    this.region = country === 'USA' || country === 'Canada' ? 'us' : 'eu';
  }

  public agent!: Agent;
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
    return this.agent.document;
  }

  public async init() {
    // const org = this.product.keywords.positive;
    // this.product.keywords.positive = ['SRASAAS'];
    // setTimeout(() => (this.product.keywords.positive = org), 15000);

    this.taskAttempt++;
    IPCMain.setTaskActivity(this.details.id, true);

    const launchArgs: IAgentCreateOptions = {
      showReplay: false,
      humanEmulatorId: 'basic',
    };

    console.log(this.getProxyString());

    if (this.proxy) {
      launchArgs.upstreamProxyUrl = this.getProxyString();
    }

    this.checkoutDelay = _.random(3000, 5000);
    this.agent = (await this.handler.createAgent(launchArgs)) as Agent;
    this.agent.on('close', () => {
      IPCMain.setTaskActivity(this.details.id, false);
    });

    await this.agent.activeTab.on('resource', resource => this.parseResponse(resource));

    const loadCommandId = await this.agent.lastCommandId;
    await this.agent.goto('https://www.supremenewyork.com/shop/all/accessories');
    await this.injectAddressCookie();
    await this.agent.activeTab.waitForLoad(LocationStatus.DomContentLoaded);
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
    await this.waitForTicket(loadCommandId);
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
      await this.agent.waitForMillis(1000);
      this.soldOutStyles = [];
      const reloadCommand = await this.agent.lastCommandId;
      await this.agent.reload();
      await this.waitForTicket(reloadCommand);
    }
    this.atcTimestamp = moment();
    this.updateTaskMessage('Loading checkout');
    await this.checkout();
    this.submitTimestamp = moment();
  }

  public getProxyString() {
    if (!this.proxy) return '';
    const auth = this.proxy.userPassAuth ? `${this.proxy.username}:${this.proxy.password}@` : '';
    return `http://${auth}${this.proxy.ipPort}`;
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
    await this.agent?.activeTab.off('resource', resource => this.parseResponse(resource));
    await this.agent?.close();
  }

  public selectSize = selectSize;
  public parseResponse = parseResponse;
  public getRemainingStyles = getRemainingStyles;
  public parseStatus = parseStatus;
  public injectAddressCookie = injectAddressCookie;
  public evaluate = evaluate;
  public queryXPath = queryXPath;
  public fillInput = fillInput;
  public selectOption = selectOption;
  public disableAnimations = disableAnimations;
  public waitForTicket = waitForTicket;
  public getProduct = getProduct;
  public selectStyle = selectStyle;
  public loadStylePage = loadStylePage;
  public addToCart = addToCart;
  public lookForModifiedButtons = lookForModifiedButtons;
  public checkout = checkout;
  public sendWebhook = sendWebhook;
  public reportCheckout = reportCheckout;
}
