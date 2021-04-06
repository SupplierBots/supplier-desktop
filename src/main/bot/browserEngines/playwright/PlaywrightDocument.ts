import { Page } from 'playwright-core';
import { PageDocument } from '../interfaces/PageDocument';
import { PageElement } from '../interfaces/PageElement';
import { PlaywrightPageElement } from './PlaywrightPageElement';

export class PlaywrightDocument implements PageDocument {
  public constructor(readonly page: Page) {}
  async querySelector(selector: string): Promise<PageElement | null> {
    const queryResult = await this.page.$(selector);
    if (!queryResult) return null;
    return new PlaywrightPageElement(queryResult);
  }
  async queryXPath(selector: string): Promise<PageElement | null> {
    return this.querySelector(selector);
  }
  async querySelectorAll(selector: string): Promise<PageElement[]> {
    const queryResult = await this.page.$$(selector);
    return queryResult.map(e => new PlaywrightPageElement(e));
  }
}
