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
import { getRemainingStyles } from './getRemainingStyles';
import { injectAddressCookie } from './injectAddressCookie';
import { loadStylePage } from './loadStylePage';
import { lookForModifiedButtons } from './lookForModifiedButtons';
import { parseResponse } from './parseResponse';
import { parseStatus } from './parseStatus';
import { ProductStyle } from './ProductStyle';
import { selectSize } from './selectSize';
import { selectStyle } from './selectStyle';

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
  public soldOutStyles: string[] = [];
  public selectedStyle: string = '';
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
    await this.agent.goto('https://www.supremenewyork.com/shop/all/accessories');
    await this.injectAddressCookie();
    await this.agent.activeTab.waitForLoad(LocationStatus.DomContentLoaded);
    console.log('Page loaded: ' + Date.now());
    await this.disableAnimations();
    this.updateTaskStatus({ message: 'Page loaded', type: TaskStatusType.Action });

    this.updateTaskMessage('Waiting for product');
    const product = await this.getProduct();
    await this.waitForTicket(loadCommandId);
    this.updateTaskMessage('Loading product details');
    await this.loadStylePage(product);
    this.selectedStyle = product.name;

    let atcSuccess = false;
    while (!atcSuccess) {
      atcSuccess = await this.addToCart();
      console.log(atcSuccess);
      if (atcSuccess) continue;
      this.soldOutStyles.push(this.selectedStyle);
      const remainingStyles = await this.getRemainingStyles();
      const nextAvailableStyle = this.selectStyle(remainingStyles);
      if (nextAvailableStyle) {
        this.selectedStyle = nextAvailableStyle.name;
        await this.loadStylePage(nextAvailableStyle);
        continue;
      }
      this.updateTaskMessage('Waiting for restock');
      await this.agent.waitForMillis(1000);
      this.soldOutStyles = [];
      const reloadCommand = await this.agent.lastCommandId;
      await this.agent.reload();
      await this.waitForTicket(reloadCommand);
    }
    this.updateTaskMessage('Loading checkout');
    await this.checkout();
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
    this.processingAttempt = 0;
    this.queued = false;
    this.ticketDecline = false;
    this.bParameter = false;
    this.cardinalURL = '';
    this.slug = '';
    this.billingErrors = 'None';
    this.soldOutStyles = [];
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
}
