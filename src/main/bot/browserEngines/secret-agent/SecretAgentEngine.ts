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

export class SecretAgentEngine implements BrowserEngine {
  private static handler?: Handler;
  private agent!: Agent;
  public document!: SecretAgentPageElement;
  private responsesListener?: (resource: Resource | WebsocketResource) => Promise<void>;

  async initialize(proxy: Proxy | null): Promise<void> {
    if (!SecretAgentEngine.handler) {
      SecretAgentEngine.handler = new Handler();
    }
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

  async load(href: string): Promise<void> {
    await this.agent.goto(href);
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

  async waitForResponse(url: string | RegExp, callBefore?: () => Promise<void>): Promise<Response> {
    const lastCommandId = await this.agent.lastCommandId;
    await callBefore?.();
    const [resource] = await this.agent.waitForResource({ url }, { sinceCommandId: lastCommandId });
    return new SecretAgentResponse(resource);
  }

  async waitForDOMContentLoaded(): Promise<void> {
    await this.agent.activeTab.waitForLoad(LocationStatus.DomContentLoaded);
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
