import { Request } from 'puppeteer';
import { TaskStatus } from '../../../types/TaskStatus';
import { IPCMain } from '../../../IPC/IPCMain';
import SupremeTask from './SupremeTask';

export async function parseRequest(req: Request, task: SupremeTask) {
  const data = req.postData();
  task.logger.reportRequest(req);

  if (req.url() !== 'http://127.0.0.1:2140/status.json' || !data) return;

  const status = JSON.parse(data) as TaskStatus;

  if (status.message === 'ATC') {
    return await task.checkout();
  }

  IPCMain.updateTaskStatus(task.task, status);

  if (status.message !== 'Sold out') return;
  await task.page.close();
  await task.page.browser().close();
}
