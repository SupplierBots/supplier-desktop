import SupremeTask from './SupremeTask';
import { TaskStatusType } from '../../../types/TaskStatus';
import { getRandomString } from './getRandomString';

export async function loadMainPage(this: SupremeTask): Promise<void> {
  this.updateTaskStatus({
    message: 'Waiting for products',
    type: TaskStatusType.Action,
  });

  try {
    await this.page.goto(`https://www.supremenewyork.com/mobile/`, {
      timeout: 3000,
    });
    this.logger.writeString('Loaded main page!');
  } catch {
    await this.loadMainPage();
    return;
  }
}
