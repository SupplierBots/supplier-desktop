import { Response } from 'puppeteer';
import { Supreme } from '../../../types/Supreme';
import { TaskStatusType } from '../../../types/TaskStatus';
import SupremeTask from './SupremeTask';

export async function parseResponse(response: Response, task: SupremeTask) {
  const status = response.status();
  const url = response.url();

  if (/.*checkout.json$/.test(url) && status !== 200) {
    task.updateTaskStatus({ message: `${status}. Retrying`, type: TaskStatusType.Error });
    await task.retry();
    return;
  }

  if (status !== 200) return;

  if (process.env.NODE_ENV === 'development' && /.*(checkout|status|add).json$/.test(url)) {
    const res = await response.text();
    console.log('RES' + response.url());
    console.log(response.headers());
    console.log(res);
    console.log('---------------');
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

    switch (res.status) {
      case 'failed':
      case '404':
      case '500':
      case 'outOfStock': {
        const message = res.status === 'outOfStock' ? 'Size sold out' : 'Failed. Retrying';
        task.updateTaskStatus({ message, type: TaskStatusType.Error });
        //await task.retry();
        return;
      }

      case 'queued': {
        task.updateTaskStatus({ message: 'Processing', type: TaskStatusType.Action });
        return;
      }

      case 'dup': {
        task.updateTaskStatus({
          message: 'Duplicate order',
          type: TaskStatusType.Error,
        });
        await task.page.close();
        await task.browser.close();
        return;
      }

      case 'paid': {
        task.updateTaskStatus({
          message: 'Success',
          type: TaskStatusType.Success,
          additionalInfo: res.id,
        });

        await task.page.close();
        await task.browser.close();
        return;
      }
    }
  }
}
