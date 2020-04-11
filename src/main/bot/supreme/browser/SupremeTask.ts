import { Browser, Page } from 'puppeteer';
import { Task } from '../../../types/Task';
import { Supreme } from '../../../types/Supreme';
import { Profile } from '../../../types/Profile';
import { IPCMain } from '../../../IPC/IPCMain';
import { ProductsMonitor } from '../ProductsMonitor';
import { TaskStatus } from '../../../types/TaskStatus';
import { Product } from '../../../types/Product';

import { parseRequest } from './parseRequest';
import { parseResponse } from './parseResponse';
import { getVisibleElement } from './getVisibleElement';
import { prepareCookies } from './prepareCookies';
import { selectOption } from './selectOption';
import { checkout } from './checkout';
import { loadMainPage } from './loadPage';
import { injectScript } from '../pageInject/injectScript';
import { Logger } from '../Logger';
import moment, { Moment } from 'moment';

class SupremeTask {
  public browser: Browser;
  public checkoutDelay: number;
  public externalStock: Supreme.Stock | null = null;
  public profile: Profile | null = null;
  public logger: Logger;

  constructor(
    readonly page: Page,
    readonly task: Task,
    readonly product: Product,
    readonly scheduledDate: Moment,
  ) {
    this.logger = new Logger(task.id, page);
    this.browser = this.page.browser();
    this.checkoutDelay =
      typeof this.task.checkoutDelay === 'string'
        ? parseInt(this.task.checkoutDelay)
        : this.task.checkoutDelay;
  }

  public init = async () => {
    ProductsMonitor.subscribe(this.setStock);
    if (!this.task.profile) return;
    this.profile = (await IPCMain.getProfile(this.task.profile.value)) ?? null;
    this.page.on('request', req => this.parseRequest(req, this));
    this.page.on('response', res => this.parseResponse(res, this));
    this.page.on('load', () => this.onLoad());
    this.logger.writeString('Started fast task!');
    await this.prepareCookies();
    await this.loadMainPage();
  };

  private onLoad = async () => {
    try {
      const fullUrl = (await this.page.evaluate('window.location.href')) as string;
      if (!fullUrl.includes('#checkout')) {
        const timeDifference = this.scheduledDate.valueOf() - moment().valueOf();
        await new Promise(resolve => setTimeout(resolve, timeDifference));
        const source = injectScript(this.product, this.externalStock);
        await this.page.evaluate(source);
      }
    } catch {}
  };

  public loadPageScript = async () => {};

  public updateTaskStatus = ({ message, type, additionalInfo }: TaskStatus) => {
    IPCMain.updateTaskStatus(this.task, {
      message,
      type,
      additionalInfo,
    });
  };

  public retry = async () => {
    try {
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
}

export default SupremeTask;
