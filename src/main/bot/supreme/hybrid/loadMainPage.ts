import { TaskStatusType } from '../../../types/TaskStatus';
import SupremeHybridTask from './SupremeHybridTask';

export async function loadMainPage(this: SupremeHybridTask): Promise<void> {
  if (!this.isActive || !this.page) return;

  this.updateTaskStatus({
    message: 'Loading website',
    type: TaskStatusType.Action,
  });

  try {
    await this.page.goto(`https://www.supremenewyork.com/mobile/#categories/new`, {
      waitUntil: 'domcontentloaded',
      timeout: 5000,
    });

    this.updateTaskStatus({
      message: 'Waiting for product',
      type: TaskStatusType.Action,
    });
  } catch {
    await this.loadMainPage();
    return;
  }
}
