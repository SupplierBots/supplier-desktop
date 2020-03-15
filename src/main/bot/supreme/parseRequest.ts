import { Request, Page } from 'puppeteer';
import { Task } from '../../types/Task';
import { TaskStatus } from '../../types/TaskStatus';
import { IPCMain } from '../../IPC/IPCMain';

const parseRequest = async (req: Request, page: Page, task: Task) => {
  const data = req.postData();

  if (req.url() !== 'http://127.0.0.1:2140/status.json' || !data) return;

  const status = JSON.parse(data) as TaskStatus;
  IPCMain.updateTaskStatus(task, status);

  if (status.message !== 'Sold out') return;
  page.browser().close();
};

export { parseRequest };
