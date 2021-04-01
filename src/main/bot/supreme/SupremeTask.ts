import { Agent, Handler, LocationStatus } from 'secret-agent';
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
import { injectAddressCookie } from './injectAddressCookie';
import { loadProductPage } from './loadProductPage';
import { lookForModifiedButtons } from './lookForModifiedButtons';
import { parseResponse } from './parseResponse';
import { parseStatus } from './parseStatus';
import { selectStyle } from './selectStyle';
import WebsocketResource from '@secret-agent/client/lib/WebsocketResource';
import Resource from '@secret-agent/client/lib/Resource';

export class SupremeTask {
  public constructor(
    readonly handler: Handler,
    readonly details: Task,
    readonly product: Product,
    readonly profile: Profile,
    readonly runner: RunnerState,
  ) {
    const country = this.profile?.country?.label;
    this.region = country === 'USA' || country === 'Canada' ? 'us' : 'eu';
  }

  public agent!: Agent;
  public region: 'us' | 'eu';
  public cardinalURL = '';
  public slug = '';
  public queued = false;
  public ticketDecline = false;
  public bParameter = false;
  public billingErrors = 'None';
  public processingAttempt = 0;

  public get document() {
    return this.agent.document;
  }

  public async init() {
    // const org = this.product.keywords.positive;
    // this.product.keywords.positive = ['SRASAAS'];
    // setTimeout(() => (this.product.keywords.positive = org), 15000);
    IPCMain.setTaskActivity(this.details.id, true);
    this.agent = (await this.handler.createAgent({
      showReplay: false,
      humanEmulatorId: 'basic',
    })) as Agent;
    this.agent.on('close', () => {
      IPCMain.setTaskActivity(this.details.id, false);
    });

    await this.agent.activeTab.on('resource', resource => this.parseResponse(resource));

    const loadCommandId = await this.agent.lastCommandId;
    await this.agent.goto('https://www.supremenewyork.com/shop/all/hats');
    await this.injectAddressCookie();
    await this.agent.activeTab.waitForLoad(LocationStatus.DomContentLoaded);
    console.log('Page loaded: ' + Date.now());
    await this.disableAnimations();
    this.updateTaskStatus({ message: 'Page loaded', type: TaskStatusType.Action });

    const product = await this.getProduct();
    await this.waitForTicket(loadCommandId);
    const start = Date.now();
    await this.loadProductPage(product);
    const added = await this.addToCart();
    if (!added) {
      return this.retry();
    }
    await this.checkout();
    console.log(Date.now() - start);
  }

  public updateTaskStatus = ({ message, type, additionalInfo }: TaskStatus) => {
    IPCMain.updateTaskStatus(this.details.id, {
      message,
      type,
      additionalInfo,
    });
  };

  public async retry() {
    this.processingAttempt = 0;
    this.queued = false;
    this.ticketDecline = false;
    this.bParameter = false;
    this.cardinalURL = '';
    this.slug = '';
    this.billingErrors = 'None';
    await this.stop();
    await this.init();
  }

  public async stop() {
    await this.agent?.activeTab.off('resource', resource => this.parseResponse(resource));
    await this.agent?.close();
  }

  public parseResponse = parseResponse;
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
  public loadProductPage = loadProductPage;
  public addToCart = addToCart;
  public lookForModifiedButtons = lookForModifiedButtons;
  public checkout = checkout;
}
