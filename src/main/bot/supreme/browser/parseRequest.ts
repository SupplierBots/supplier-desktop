import { Request } from 'puppeteer';
import { TaskStatus } from '../../../types/TaskStatus';
import { IPCMain } from '../../../IPC/IPCMain';
import SupremeTask from './SupremeTask';

export async function parseRequest(request: Request, task: SupremeTask) {
  const postData = request.postData();
  const url = request.url();
  task.logger.reportRequest(request);

  // if (url === 'https://www.supremenewyork.com/checkout.json' && request.method() === 'POST') {
  //   const headers = request.headers();

  //   if (!postData) {
  //     request.continue();
  //     return;
  //   }

  //   request.respond({
  //     contentType: 'application/json; charset=utf-8',
  //     body: JSON.stringify({
  //       status: 'failed',
  //       cart: [],
  //       errors: {
  //         order: {},
  //         credit_card: {
  //           year: ['expired'],
  //           number: [],
  //           brand: [],
  //         },
  //       },
  //     }),
  //   });
  //   task.checkoutThroughRequest(headers, postData);
  //   return;
  // }

  if (
    request.method() !== 'POST' ||
    request.url() !== 'http://127.0.0.1:2140/status.json' ||
    !postData
  ) {
    return;
  }

  const status = JSON.parse(postData) as TaskStatus;
  task.item = status.item ? status.item : null;

  if (status.message === 'ATC') {
    await task.checkout();
    return;
  }

  IPCMain.updateTaskStatus(task.task.id, status);

  if (status.message !== 'Sold out') return;
  task.sendWebhook({ status: 'outOfStock', id: 'Unknown' });
  task.isActive = false;
  await task.page.close();
  await task.page.browser().close();
}
