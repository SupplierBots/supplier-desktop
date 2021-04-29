import _ from 'lodash';
import { SupremeTask } from './SupremeTask';

export async function lookForModifiedButtons(this: SupremeTask, names: string[]) {
  const buttons = await this.document.querySelectorAll('button');
  buttons.forEach(async button => {
    const text = await button.innerText;
    if (text.length === 0 || !_.intersection(text, names)) return;
    this.modifiedButtons.push(text);
    await button.click();
  });
}
