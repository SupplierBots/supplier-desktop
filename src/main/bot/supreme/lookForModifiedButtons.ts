import _ from 'lodash';
import { SupremeTask } from './SupremeTask';

export async function lookForModifiedButtons(this: SupremeTask, names: string[]) {
  const buttons = this.document.querySelectorAll('button');
  await buttons.forEach(async button => {
    const text = await button.innerText;
    if (!_.intersection(text, names)) return;
    await this.agent.interact({ click: button });
  });
}
