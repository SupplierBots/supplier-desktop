import { ItemDetails } from './../../../types/ItemDetails';
import { Subscription } from 'rxjs';
import { Browser, Page, BrowserContext } from 'puppeteer-core';
import { Task } from '../../../types/Task';
import { Supreme } from '../../../types/Supreme';
import { Profile } from '../../../types/Profile';
import { IPCMain } from '../../../IPC/IPCMain';
import { ProductsMonitor } from '../ProductsMonitor';
import { TaskStatus, TaskStatusType } from '../../../types/TaskStatus';
import { Product } from '../../../types/Product';

import { sendWebhook } from './sendWebhook';
import { prepareCookies, setAddressCookie } from './prepareCookies';

import { loadMainPage } from './loadMainPage';
import { autofillCheckout } from './autofillCheckout';
import { getVisibleElement } from './getVisibleElement';
import { saveEvaluate } from './saveEvaluate';
import { reportCheckout } from './reportCheckout';
import { parseStatus } from './parseStatus';
import { parseRequest } from './parseRequest';
import { parseResponse } from './parseResponse';
import { skipCardinal } from './skipCardinal';

import { selectOption } from './selectOption';
import { injectScript } from '../pageInject/injectScript';
import moment, { Moment } from 'moment';
import { Proxy } from '../../../types/Proxy';
import { RunnerState } from '../../../types/RunnerState';
import { UserAgent, UserAgentsManager } from '../UserAgentsManager';
import { TasksManager } from '../../../bot/core/TasksManager';
import ProxiesManager from '../../../bot/core/ProxiesManager';
import { mockEnviroment } from '../pageInject/mockEnviroment';

class SupremeHybridTask {
  public browser: Browser;
  public page: Page | null = null;
  public browserContext: BrowserContext | null = null;
  public proxy: Proxy | null = null;
  public userAgentData: UserAgent = UserAgentsManager.getIPhone();
  public isActive = true;
  public checkoutDelay: number;
  public externalStock: Supreme.Stock | null = null;
  public startTime: Moment = moment();
  public atcTime: Moment = moment();
  public submitTime: Moment = moment();
  public item: ItemDetails = null;
  public region: 'us' | 'eu';
  public proxyString: string = '';
  public checkoutPostData: string = '';
  public stockMonitor: Subscription;
  public scheduledDate: Moment;
  public bypassCardinal: boolean;
  public taskAttempt = 0;

  //Resetable
  public processingAttempt = 0;
  public queued = false;
  public ticketDecline = false;
  public cardinalID = '';
  public cardinalURL = '';
  public slug: string = '';
  public bParameter = false;
  public sitekey: string = '';
  public billingErrors: string = 'None';

  constructor(
    readonly sharedBrowser: Browser,
    readonly taskIndex: number,
    readonly details: Task,
    readonly product: Product,
    readonly profile: Profile,
    readonly runner: RunnerState,
  ) {
    this.browser = sharedBrowser;
    this.stockMonitor = ProductsMonitor.subscribe(this.setStock);
    this.bypassCardinal = !!details.bypassCardinal;

    const country = this.profile?.country?.label;

    this.region = country === 'USA' || country === 'Canada' ? 'us' : 'eu';

    this.checkoutDelay =
      typeof this.details.checkoutDelay === 'string'
        ? parseInt(this.details.checkoutDelay)
        : this.details.checkoutDelay;

    this.scheduledDate = this.scheduledDate = moment(runner.time, 'DD/MM HH:mm:ss');

    this.browser.on('disconnected', async () => {
      IPCMain.setTaskActivity(this.details.id, false);
      TasksManager.clearHybirdTask(this.details.id);
    });
  }

  public setStock = (stock: Supreme.Stock) => {
    this.externalStock = { ...stock };
  };

  public updateTaskStatus = ({ message, type, additionalInfo }: TaskStatus) => {
    if (!this.page || this.page.isClosed()) return;
    IPCMain.updateTaskStatus(this.details.id, {
      message,
      type,
      additionalInfo,
    });
  };

  public init = async () => {
    IPCMain.setTaskActivity(this.details.id, true);
    this.taskAttempt++;

    if (this.page) {
      await this.page.close();
    }

    if (this.browserContext) {
      await this.browserContext.close();
    }

    this.browserContext = await this.browser.createIncognitoBrowserContext();
    this.page = await this.browserContext.newPage();

    this.page.evaluateOnNewDocument(mockEnviroment());

    this.userAgentData = UserAgentsManager.getIPhone();

    try {
      await this.page.emulate({
        userAgent: this.userAgentData.userAgent,
        viewport: {
          width: this.userAgentData.viewportWidth,
          height: this.userAgentData.viewportHeight,
          deviceScaleFactor: 3,
          isMobile: true,
          hasTouch: true,
          isLandscape: false,
        },
      });
    } catch (ex) {
      await this.init();
      return;
    }

    this.proxy =
      this.runner.proxies && this.taskIndex >= this.runner.localIPTasks
        ? ProxiesManager.getRandom()
        : null;

    if (this.proxy) {
      var ipPort = this.proxy.ipPort.replace(/https?:\/\//, '');
      this.proxyString = this.proxy.userPassAuth
        ? `http://${this.proxy.username}:${this.proxy.password}@${ipPort}`
        : `http://${ipPort}`;
    }

    await this.page.setRequestInterception(true);
    this.page.on('request', req => this.parseRequest(req, this));
    this.page.on('response', res => this.parseResponse(res, this));
    this.page.on('domcontentloaded', () => this.onLoad());

    await this.setAddressCookie();
    await this.loadMainPage();
  };

  private onLoad = async () => {
    try {
      if (!this.isActive || !this.page) return;
      const fullUrl = (await this.saveEvaluate('window.location.href')) as string;
      if (fullUrl.includes('#checkout')) return;

      if (this.runner.scheduled) {
        const timeDifference = this.scheduledDate.valueOf() - moment().valueOf();
        if (timeDifference > 0) {
          this.updateTaskStatus({ message: 'Waiting', type: TaskStatusType.Action });
        }
        await new Promise(resolve => setTimeout(resolve, timeDifference));
      }

      const source = injectScript(this.product, this.externalStock, this.region, {
        enabled: this.runner.restocks,
        delay: this.runner.monitorDelay,
      });
      this.startTime = moment();

      await this.saveEvaluate(source);
    } catch {}
  };

  public retry = async () => {
    this.processingAttempt = 0;
    this.queued = false;
    this.ticketDecline = false;
    this.cardinalID = '';
    this.cardinalURL = '';
    this.slug = '';
    this.sitekey = '';
    this.billingErrors = 'None';
    await this.init();
  };

  public stop = async () => {
    this.isActive = false;
    if (this.page) {
      await this.page.close();
    }

    if (this.browser && this.browser.isConnected()) {
      this.browser.close();
    }
  };

  public wait = async (m: number) => new Promise(r => setTimeout(r, m));

  public sendWebhook = sendWebhook;
  public prepareCookies = prepareCookies;
  public setAddressCookie = setAddressCookie;
  public loadMainPage = loadMainPage;
  public autofillCheckout = autofillCheckout;
  public getVisibleElement = getVisibleElement;
  public saveEvaluate = saveEvaluate;
  public selectOption = selectOption;
  public parseRequest = parseRequest;
  public parseResponse = parseResponse;
  public parseStatus = parseStatus;
  public reportCheckout = reportCheckout;
  public skipCardinal = skipCardinal;
}

export default SupremeHybridTask;
