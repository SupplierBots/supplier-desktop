import { PageElement } from '../interfaces/PageElement';
import { Agent } from '@secret-agent/client';
import { ISuperNode, ISuperElement } from 'awaited-dom/base/interfaces/super';
import { KeyboardKeys } from '@secret-agent/client';
import { IKeyboardKey } from '@secret-agent/core-interfaces/IKeyboardLayoutUS';

export class SecretAgentPageElement implements PageElement {
  constructor(readonly element: ISuperNode | ISuperElement, readonly agent: Agent) {}

  get innerHTML(): Promise<string> {
    return this.element.innerHTML;
  }
  get innerText(): Promise<string> {
    return this.element.innerText;
  }

  get dataset(): Promise<{ [key: string]: string }> {
    return (async () => {
      const html = await this.element.outerHTML;
      const dataset: { [key: string]: string } = {};
      const matches = html.match(/data-.+?(?==)/g);
      if (!matches) return dataset;
      await Promise.all(
        matches.map(async attribute => {
          const value = await this.getAttribute(attribute);
          const [, ...name] = attribute.split('-');
          const key = name.join().replace(/,./g, x => x[1].toUpperCase());
          dataset[key] = value ?? '';
        }),
      );
      return dataset;
    })();
  }

  private get bounds(): Promise<{ x: number; y: number; height: number; width: number }> {
    return (async () => {
      const bounds = await this.element.getBoundingClientRect();
      const x = await bounds.x;
      const y = await bounds.y;
      const width = await bounds.width;
      const height = await bounds.height;
      return {
        x,
        y,
        width,
        height,
      };
    })();
  }

  async getAttribute(attribute: string): Promise<string | null> {
    return this.element.getAttribute(attribute);
  }

  async focus(): Promise<void> {
    await this.agent.interact({
      click: this.element,
    });
  }

  async pressKey(value: string): Promise<void> {
    await this.agent.interact({
      type: value,
    });
  }

  async tickCheckbox(): Promise<void> {
    const bounds = await this.bounds;
    const { x, y, height, width } = bounds;
    await this.agent.interact({ click: [x + width / 2, y + height / 2] });
  }

  async selectOption(value: string): Promise<void> {
    await this.agent.interact({
      click: this.element,
    });

    for (const character of value.split('')) {
      const code = character as IKeyboardKey;
      await this.agent.interact({
        keyPress: KeyboardKeys[code],
      });
    }

    await this.agent.interact({
      keyPress: KeyboardKeys.Enter,
    });
  }

  async click(): Promise<void> {
    await this.agent.interact({ click: this.element });
  }

  async querySelector(selector: string): Promise<PageElement | null> {
    const queryResult = await this.element.querySelector(selector);
    if (!queryResult) return null;
    return new SecretAgentPageElement(queryResult, this.agent);
  }

  async querySelectorAll(selector: string): Promise<PageElement[]> {
    const queryResult = [...(await this.element.querySelectorAll(selector))];
    return queryResult.map(e => new SecretAgentPageElement(e, this.agent));
  }

  async queryXPath(selector: string): Promise<PageElement | null> {
    const queryResult = await this.agent.document.evaluate(selector, this.element).iterateNext();
    if (!queryResult) return null;
    return new SecretAgentPageElement(queryResult, this.agent);
  }
}
