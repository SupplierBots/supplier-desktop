import { Proxy } from '../../../types/Proxy';
import { Cookie } from './Cookie';
import { PageElement } from './PageElement';
import { Response } from './Response';

export interface BrowserEngine {
  document: PageElement;
  pathname: Promise<string>;
  initialize(proxy: Proxy | null): Promise<void>;
  stop(): Promise<void>;
  evaluate(source: string): Promise<void>;
  load(href: string): Promise<void>;
  setCookie(cookie: Cookie): Promise<void>;
  click(x: number, y: number): Promise<void>;
  waitForElement(selector: string, options: { visible: boolean }): Promise<void>;
  waitForXPath(xPath: string, options: { visible: boolean }): Promise<void>;
  waitForResponse(url: RegExp | string, callBefore?: () => Promise<void>): Promise<Response>;
  waitForMiliseconds(miliseconds: number): Promise<void>;
  waitForDOMContentLoaded(): Promise<void>;
  reload(): Promise<void>;
  onResponse(listenFn: (event: Response) => void): Promise<void>;
  onClose(callback: () => void): void;
}
