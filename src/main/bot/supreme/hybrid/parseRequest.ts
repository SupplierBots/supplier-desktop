import { Request } from 'puppeteer-core';
import { TaskStatus } from '../../../types/TaskStatus';
import { IPCMain } from '../../../IPC/IPCMain';
import SupremeHybridTask from './SupremeHybridTask';
import moment from 'moment';
import proxyRequest from 'puppeteer-page-proxy';

export async function parseRequest(request: Request, task: SupremeHybridTask) {
  if (!task.isActive || !task.page) return;

  const postData = request.postData();
  const method = request.method();
  const url = request.url();

  if (task.bypassCardinal && url.includes('cardinal.json') && !url.includes('verify')) {
    request.abort();
    return;
  }

  if (task.bypassCardinal && url.includes('a')) {
    request.abort();
    return;
  }

  if (url === 'http://127.0.0.1:2140/supplier.json' && postData && method === 'POST') {
    const status = JSON.parse(postData) as TaskStatus;
    task.item = status.item ? status.item : null;

    if (status.message === 'ATC') {
      task.atcTime = moment();
      await task.autofillCheckout();
      return;
    }

    IPCMain.updateTaskStatus(task.details.id, status);

    if (status.message !== 'Sold out') return;

    task.sendWebhook({ status: 'outOfStock', id: 'Unknown' });
    await task.stop();
    return;
  }

  if (task.proxy) {
    await proxyRequest(request, task.proxyString);
  } else {
    request.continue();
  }
}
