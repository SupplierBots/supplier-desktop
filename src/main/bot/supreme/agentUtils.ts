import { SupremeTask } from './SupremeTask';
import { ISuperNode, ISuperElement } from 'awaited-dom/base/interfaces/super';
import { KeyboardKeys } from '@secret-agent/client';
import { IKeyboardKey } from '@secret-agent/core-interfaces/IKeyboardLayoutUS';
import _ from 'lodash';

export async function evaluate(this: SupremeTask, source: string) {
  await this.agent.getJsValue(`
      (() => {
        try {
          ${source}
        } catch (ex) {}
      })();
  `);
}

export async function disableAnimations(this: SupremeTask) {
  await this.evaluate('jQuery.fx.off = true;');
}

export async function waitForTicket(this: SupremeTask, lastCommandId?: number) {
  const script = await this.document.querySelector("script[src*='ticket']");
  if (!script) return;
  await this.agent.waitForResource({ url: /ticket.js/ }, { sinceCommandId: lastCommandId });
  console.log('Ticket loaded: ' + Date.now());
}

export async function queryXPath(this: SupremeTask, selector: string) {
  return this.document.evaluate(selector, this.document).iterateNext();
}

export async function fillInput(this: SupremeTask, node: ISuperNode, value: string) {
  await this.agent.interact({
    click: node,
  });
  for (const character of value.split('')) {
    await this.agent.interact({
      type: character,
    });
    await this.agent.waitForMillis(_.random(35, 65));
  }
}

export const getDataset = async (element: ISuperElement) => {
  const html = await element.outerHTML;
  const dataset: { [key: string]: string } = {};
  const matches = html.match(/data-.+?(?==)/g);
  if (!matches) return dataset;
  await Promise.all(
    matches.map(async attribute => {
      const value = await element.getAttribute(attribute);
      const [, ...name] = attribute.split('-');
      const key = name.join().replace(/,./g, x => x[1].toUpperCase());
      dataset[key] = value ?? '';
    }),
  );
  return dataset;
};

export async function selectOption(
  this: SupremeTask,
  node: ISuperNode | ISuperElement,
  value: string,
) {
  await this.agent.interact({
    click: node,
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
