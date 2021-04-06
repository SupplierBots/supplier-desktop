import { Proxy } from '../../../types/Proxy';
import { Cookie } from './Cookie';
import { PageDocument } from './PageDocument';
import { Response } from './Response';

export interface BrowserEngine {
  document: PageDocument;
  pathname: Promise<string>;
  initialize(proxy: Proxy | null): Promise<void>;
  stop(): Promise<void>;
  evaluate(source: string): Promise<void>;
  load(url: string): Promise<void>;
  setCookie(cookie: Cookie): Promise<void>;
  click(x: number, y: number): Promise<void>;
  waitForElement(selector: string, options: { visible: boolean }): Promise<void>;
  waitForXPath(xPath: string, options: { visible: boolean }): Promise<void>;
  waitForResponse(url: RegExp | string, callBefore?: () => Promise<void>): Promise<Response>;
  waitForMiliseconds(miliseconds: number): Promise<void>;
  waitForDOMContentLoaded(): Promise<void>;
  waitForResourcesLoad(): Promise<void>;
  reload(): Promise<void>;
  onResponse(listenFn: (response: Response) => void): Promise<void>;
  onPathChange(listenFn: (url: string) => void): Promise<void>;
  onClose(callback: () => void): void;
}
