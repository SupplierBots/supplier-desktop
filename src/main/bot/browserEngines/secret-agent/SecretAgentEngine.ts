import { Agent, IAgentCreateOptions } from '@secret-agent/client';
import { Proxy } from 'main/types/Proxy';
import { BrowserEngine } from '../interfaces/BrowserEngine';
import { Cookie } from '../interfaces/Cookie';
import { Response } from '../interfaces/Response';
import { SecretAgentResponse } from './SecretAgentResponse';
import { Handler, LocationStatus } from 'secret-agent';
import WebsocketResource from '@secret-agent/client/lib/WebsocketResource';
import Resource from '@secret-agent/client/lib/Resource';
import { SecretAgentPageElement } from './SecretAgentPageElement';
import moment from 'moment';

export class SecretAgentEngine implements BrowserEngine {
  private static handler: Handler;
  private agent!: Agent;
  public document!: SecretAgentPageElement;
  private responsesListener?: (resource: Resource | WebsocketResource) => Promise<void>;
  private pathListener?: (resource: Resource | WebsocketResource) => Promise<void>;
  private lastPathname = '';

  static async startHandler() {
    if (!SecretAgentEngine.handler) {
      SecretAgentEngine.handler = new Handler();
    }
  }

  async initialize(proxy: Proxy | null): Promise<void> {
    const launchArgs: IAgentCreateOptions = {
      showReplay: false,
      humanEmulatorId: 'basic',
    };

    if (proxy) {
      launchArgs.upstreamProxyUrl = this.getProxyString(proxy);
    }

    this.agent = (await SecretAgentEngine.handler.createAgent(launchArgs)) as Agent;
    this.document = new SecretAgentPageElement(
      this.agent.document.querySelector('html'),
      this.agent,
    );
  }

  async stop(): Promise<void> {
    if (this.responsesListener) {
      const listener = this.responsesListener;
      await this.agent?.activeTab.off('resource', listener);
    }
    if (this.pathListener) {
      const listener = this.pathListener;
      await this.agent?.activeTab.off('resource', listener);
    }
    await this.agent?.close();
  }

  async waitForMiliseconds(miliseconds: number): Promise<void> {
    await this.agent.waitForMillis(miliseconds);
  }
  async reload(): Promise<void> {
    await this.agent.reload();
  }

  get pathname(): Promise<string> {
    return this.agent.document.location.pathname;
  }

  async click(x: number, y: number): Promise<void> {
    await this.agent.interact({ click: [x, y] });
  }

  async evaluate(source: string): Promise<void> {
    await this.agent.getJsValue(`
      (() => {
        try {
          ${source}
        } catch (ex) {}
      })();
  `);
  }

  async load(url: string): Promise<void> {
    await this.agent.goto(url);
  }
  async setCookie({ name, value, expires, httpOnly, secure, sameSite }: Cookie): Promise<void> {
    await this.agent.activeTab.cookieStorage.setItem(name, value, {
      expires: expires.valueOf() / 1000,
      httpOnly,
      secure,
      sameSite,
    });
  }

  async waitForElement(selector: string, { visible }: { visible: boolean }): Promise<void> {
    const element = this.agent.document.querySelector(selector);
    await this.agent.waitForElement(element, { waitForVisible: visible });
  }

  async waitForXPath(selector: string, { visible }: { visible: boolean }): Promise<void> {
    const element = await this.queryXPath(selector);
    await this.agent.waitForElement(element, { waitForVisible: visible });
  }

  async onResponse(listenFn: (response: Response) => void): Promise<void> {
    const listener = async (resource: Resource | WebsocketResource) => {
      listenFn(new SecretAgentResponse(resource));
    };
    this.responsesListener = listener;
    await this.agent.activeTab.on('resource', listener);
  }

  async onPathChange(listenFn: (url: string) => void): Promise<void> {
    const listener = async (resource: Resource | WebsocketResource) => {
      if (resource.type !== 'Document') return;
      const pathname = await this.pathname;
      if (pathname === this.lastPathname) return;
      this.lastPathname = pathname;
      listenFn(pathname);
    };
    this.pathListener = listener;
    await this.agent.activeTab.on('resource', listener);
  }

  async waitForResponse(url: string | RegExp, callBefore?: () => Promise<void>): Promise<Response> {
    const lastCommandId = await this.agent.lastCommandId;
    const initTimestamp = moment();
    await callBefore?.();
    const [resource] = await this.agent.waitForResource(
      {
        url,
        filterFn: async (resource, done) => {
          const responseTimestamp = moment(await resource.response.timestamp);
          if (responseTimestamp.valueOf() >= initTimestamp.valueOf()) {
            done();
            return true;
          }
          return false;
        },
      },
      { sinceCommandId: lastCommandId },
    );
    return new SecretAgentResponse(resource);
  }

  async waitForDOMContentLoaded(): Promise<void> {
    await this.agent.activeTab.waitForLoad(LocationStatus.DomContentLoaded);
  }

  async waitForResourcesLoad(): Promise<void> {
    let documentReadyState = await this.getReadyState();
    while (documentReadyState !== 'complete') {
      await new Promise(r => setTimeout(r, 100));
      documentReadyState = await this.getReadyState();
    }
  }

  private async getReadyState() {
    return (await this.agent.getJsValue<string>('document.readyState')).value;
  }

  private async queryXPath(selector: string) {
    return this.agent.document.evaluate(selector, this.agent.document).iterateNext();
  }

  onClose(callback: () => void): void {
    this.agent.on('close', callback);
  }

  public static async dispose() {
    await this.handler?.close();
  }

  public getProxyString(proxy: Proxy) {
    const auth = proxy.userPassAuth ? `${proxy.username}:${proxy.password}@` : '';
    return `http://${auth}${proxy.ipPort}`;
  }
}
