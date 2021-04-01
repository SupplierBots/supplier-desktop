import { SupremeTask } from './SupremeTask';
import { ISuperNode, ISuperDocument, ISuperElement } from 'awaited-dom/base/interfaces/super';
import { KeyboardKeys } from '@secret-agent/client';
import { IKeyboardKey } from '@secret-agent/core-interfaces/IKeyboardLayoutUS';

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
  const script = saveQuerySelector(this.document, "script[src*='ticket']");
  if (!script) return;
  await this.agent.waitForResource({ url: /ticket.js/ }, { sinceCommandId: lastCommandId });
  console.log('Ticket loaded: ' + Date.now());
}

export async function queryXPath(this: SupremeTask, selector: string) {
  return this.document.evaluate(selector, this.document).iterateNext();
}

export function getRandomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export async function fillInput(this: SupremeTask, node: ISuperNode, value: string) {
  await this.agent.interact({
    click: node,
  });
  for (const character of value.split('')) {
    await this.agent.interact({
      type: character,
    });
    await this.agent.waitForMillis(getRandomRange(35, 65));
  }
}

export async function selectOption(this: SupremeTask, node: ISuperNode, value: string) {
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

export async function saveQuerySelector(
  node: ISuperDocument | ISuperNode | ISuperElement,
  selector: string,
) {
  const elements = node.querySelectorAll(selector);
  const length = await elements.length;
  if (length === 0) return null;
  return elements[0];
}
