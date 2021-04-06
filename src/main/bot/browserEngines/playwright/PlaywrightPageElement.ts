import _ from 'lodash';
import { ElementHandle } from 'playwright-core';
import { PageElement } from '../interfaces/PageElement';

export class PlaywrightPageElement implements PageElement {
  constructor(readonly element: ElementHandle) {}

  get innerHTML(): Promise<string> {
    return this.element.innerHTML();
  }
  get innerText(): Promise<string> {
    return this.element.innerText();
  }

  get dataset(): Promise<{ [key: string]: string }> {
    return (async () => {
      const handle = await this.element.getProperty('dataset');
      return handle.jsonValue();
    })();
  }

  async getAttribute(attribute: string): Promise<string | null> {
    const handle = await this.element.getProperty(attribute);
    return handle.jsonValue();
  }
  async click(): Promise<void> {
    await this.element.click({ delay: 77 });
  }

  async tickCheckbox(): Promise<void> {
    await this.element.check();
  }

  async focus(): Promise<void> {
    await this.element.focus();
  }

  async pressKey(value: string): Promise<void> {
    await this.element.press(value);
  }

  async selectOption(value: string): Promise<void> {
    await this.element.selectOption({ label: value });
  }
  async querySelector(selector: string): Promise<PageElement | null> {
    const queryResult = await this.element.$(selector);
    if (!queryResult) return null;
    return new PlaywrightPageElement(queryResult);
  }
  async queryXPath(selector: string): Promise<PageElement | null> {
    return this.querySelector(selector);
  }
  async querySelectorAll(selector: string): Promise<PageElement[]> {
    const queryResult = await this.element.$$(selector);
    return queryResult.map(e => new PlaywrightPageElement(e));
  }
}
