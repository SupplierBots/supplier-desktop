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

class SupremeTask {
  public browser: Browser;
  public checkoutDelay: number;
  public externalStock: Supreme.Stock | null = null;
  public profile: Profile | null = null;

  constructor(readonly page: Page, readonly task: Task, readonly product: Product) {
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

    await this.prepareCookies();
    await this.loadMainPage();
    await this.checkout();
  };

  private onLoad = async () => {
    try {
      const fullUrl = (await this.page.evaluate('window.location.href')) as string;
      if (fullUrl.includes('supplier')) {
        const source = injectScript(this.product, this.externalStock);
        await this.page.evaluate(source);
      }
    } catch {}
  };

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
      await this.checkout();
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
