import { ItemDetails } from './../../../types/ItemDetails';
import { Subscription } from 'rxjs';
import { Browser, Page } from 'puppeteer';
import { Task } from '../../../types/Task';
import { Supreme } from '../../../types/Supreme';
import { Profile } from '../../../types/Profile';
import { IPCMain } from '../../../IPC/IPCMain';
import { ProductsMonitor } from '../ProductsMonitor';
import { TaskStatus, TaskStatusType } from '../../../types/TaskStatus';
import { Product } from '../../../types/Product';

import { parseRequest } from './parseRequest';
import { parseResponse } from './parseResponse';
import { sendRequest } from '../../requests/sendRequest';
import { getVisibleElement } from './getVisibleElement';
import { prepareCookies, setAddressCookie } from './prepareCookies';
import { selectOption } from './selectOption';
import { checkout } from './checkout';
import { loadMainPage } from './loadPage';
import { sendWebhook } from './sendWebhook';
import { reportCheckout } from './reportCheckout';
import { saveEvaluate } from './saveEvaluate';
import { checkoutThroughRequest } from '../../requests/checkoutThroughRequest';
import { injectScript } from '../pageInject/injectScript';
import { Logger } from '../Logger';
import moment, { Moment } from 'moment';
import { Proxy } from '../../../types/Proxy';

class SupremeTask {
  public browser: Browser;
  public checkoutDelay: number;
  public externalStock: Supreme.Stock | null = null;
  public logger: Logger;
  public startTime: Moment = moment();
  public submitTime: Moment = moment();
  public item: ItemDetails = null;
  public region: 'us' | 'eu';
  public cardinalUrl: string = '';
  public isActive = true;
  public checkoutHeaders: Record<string, string> = {};
  public slug: string = '';
  public checkoutPostData: string = '';
  public cookies: string = '';
  public restocks: {
    enabled: boolean;
    delay: number;
  };
  public stockMonitor: Subscription;

  constructor(
    readonly page: Page,
    readonly task: Task,
    readonly product: Product,
    readonly profile: Profile,
    readonly proxy: Proxy | null,
    readonly scheduledDate: Moment,
    readonly isScheduled: boolean,
    restocks: boolean,
    monitorDelay: number,
  ) {
    this.logger = new Logger(task.id, page);
    this.browser = this.page.browser();

    this.stockMonitor = ProductsMonitor.subscribe(this.setStock);

    const country = this.profile?.country?.label;
    this.region = country === 'USA' || country === 'Canada' ? 'us' : 'eu';

    this.restocks = {
      enabled: restocks,
      delay: monitorDelay,
    };

    this.checkoutDelay =
      typeof this.task.checkoutDelay === 'string'
        ? parseInt(this.task.checkoutDelay)
        : this.task.checkoutDelay;
  }

  public init = async () => {
    //this.page.setRequestInterception(true);
    this.page.on('request', req => this.parseRequest(req, this));
    this.page.on('response', res => this.parseResponse(res, this));
    this.page.on('domcontentloaded', () => this.onLoad());
    this.logger.writeString('Started fast task!');
    await this.prepareCookies();
    await this.loadMainPage();
  };

  private onLoad = async () => {
    try {
      if (!this.isActive) return;
      const fullUrl = (await this.page.evaluate('window.location.href')) as string;
      if (!fullUrl.includes('#checkout')) {
        if (this.isScheduled) {
          const timeDifference = this.scheduledDate.valueOf() - moment().valueOf();
          if (timeDifference > 0) {
            this.updateTaskStatus({ message: 'Waiting', type: TaskStatusType.Action });
          }
          await new Promise(resolve => setTimeout(resolve, timeDifference));
        }
        const source = injectScript(this.product, this.externalStock, this.region, this.restocks);
        this.startTime = moment();
        await this.saveEvaluate(source);
      }
    } catch {}
  };

  public updateTaskStatus = ({ message, type, additionalInfo }: TaskStatus) => {
    if (!this.isActive || this.page.isClosed()) return;
    IPCMain.updateTaskStatus(this.task.id, {
      message,
      type,
      additionalInfo,
    });
  };

  public retry = async () => {
    try {
      if (!this.isActive) return;
      await new Promise(resolve => setTimeout(resolve, 1000));
      await this.prepareCookies();
      await this.loadMainPage();
      await this.page.reload();
    } catch {}
  };

  public setStock = (stock: Supreme.Stock) => {
    this.externalStock = { ...stock };
  };

  //* Link external functions
  public parseRequest = parseRequest;
  public parseResponse = parseResponse;
  public getVisibleElement = getVisibleElement;
  public prepareCookies = prepareCookies;
  public selectOption = selectOption;
  public checkout = checkout;
  public loadMainPage = loadMainPage;
  public reportCheckout = reportCheckout;
  public setAddressCookie = setAddressCookie;
  public checkoutThroughRequest = checkoutThroughRequest;
  public sendRequest = sendRequest;
  public sendWebhook = sendWebhook;
  public saveEvaluate = saveEvaluate;
}

export default SupremeTask;
