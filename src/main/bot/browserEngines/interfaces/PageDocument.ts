import { PageElement } from './PageElement';

export interface PageDocument {
  querySelector(selector: string): Promise<PageElement | null>;
  queryXPath(selector: string): Promise<PageElement | null>;
  querySelectorAll(selector: string): Promise<PageElement[]>;
}
