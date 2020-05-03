import { Response } from 'puppeteer';
import { Supreme } from '../../../types/Supreme';
import { TaskStatusType } from '../../../types/TaskStatus';
import SupremeTask from './SupremeTask';

export async function parseResponse(response: Response, task: SupremeTask) {
  const status = response.status();
  const url = response.url();

  task.logger.reportResponse(response);

  if (/.*checkout.json$/.test(url) && status !== 200) {
    task.updateTaskStatus({ message: `${status}. Retrying`, type: TaskStatusType.Error });
    await task.retry();
    return;
  }

  if (status !== 200) return;

  if (url === task.cardinalUrl) {
    task.updateTaskStatus({ message: 'Awaiting 3D Secure', type: TaskStatusType.Action });
    return;
  }

  if (url.includes('cardinal.json')) {
    task.updateTaskStatus({ message: 'Submitting 3D Secure', type: TaskStatusType.Action });
    return;
  }

  if (/.*add.json$/.test(url)) {
    const res = (await response.json()) as Supreme.AddToCartResponse;
    if (res.length > 0) {
      task.updateTaskStatus({
        message: 'Added to cart',
        type: TaskStatusType.Action,
      });
    } else if (res.length === 0) {
      task.updateTaskStatus({ message: 'Size sold out', type: TaskStatusType.Error });
      await task.retry();
    }
  } else if (/.*(checkout|status).json$/.test(url)) {
    const res = (await response.json()) as Supreme.CheckoutResponse;

    if (res.status !== 'queued') {
      task.reportCheckout(res);
    }

    switch (res.status) {
      case 'failed':
      case '404':
      case '500':
      case 'outOfStock': {
        const message = res.status === 'outOfStock' ? 'Size sold out' : 'Failed. Retrying';
        task.updateTaskStatus({ message, type: TaskStatusType.Error });
        task.sendWebhook(res);
        await task.retry();
        break;
      }

      case 'queued': {
        task.updateTaskStatus({ message: 'Processing', type: TaskStatusType.Action });
        break;
      }
      case 'cca': {
        if (res.acs_url) {
          task.cardinalUrl = res.acs_url;
          task.updateTaskStatus({ message: 'Loading 3D Secure', type: TaskStatusType.Action });
        }
        break;
      }
      case 'dup': {
        task.updateTaskStatus({
          message: 'Duplicate order',
          type: TaskStatusType.Error,
        });
        task.sendWebhook(res);
        await task.page.close();
        await task.browser.close();
        break;
      }
      case 'cardinal_queued': {
        task.updateTaskStatus({ message: 'Processing 3D Secure', type: TaskStatusType.Action });
        break;
      }
      case 'paid': {
        task.updateTaskStatus({
          message: 'Success',
          type: TaskStatusType.Success,
          additionalInfo: res.id,
        });
        task.sendWebhook(res);

        await task.page.close();
        await task.browser.close();
        break;
      }
    }
  }
}
