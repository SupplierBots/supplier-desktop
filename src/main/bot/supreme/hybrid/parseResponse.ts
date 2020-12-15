import { Response } from 'puppeteer-core';
import { Supreme } from '../../../types/Supreme';
import SupremeHybridTask from './SupremeHybridTask';
import { TaskStatusType } from '../../../types/TaskStatus';

export async function parseResponse(response: Response, task: SupremeHybridTask) {
  const status = response.status();
  const url = response.url();

  if (/.*checkout.json$/.test(url) && status !== 200) {
    task.updateTaskStatus({ message: `${status}. Retrying`, type: TaskStatusType.Error });
    await task.retry();
    return;
  }

  if (status !== 200) return;

  if (url === task.cardinalURL) {
    task.updateTaskStatus({ message: 'Awaiting 3D Secure', type: TaskStatusType.Action });
    return;
  }

  if (url.includes('cardinal.json')) {
    if (!task.bypassCardinal) {
      task.updateTaskStatus({ message: 'Submitting 3D Secure', type: TaskStatusType.Action });
    }
    return;
  }

  if (/.*add.json$/.test(url)) {
    const res = (await response.json()) as Supreme.AddToCartResponse;
    if (Array.isArray(res) && res.length > 0) {
      task.updateTaskStatus({
        message: 'Added to cart',
        type: TaskStatusType.Action,
      });
    } else if (
      (Array.isArray(res) && res.length === 0) ||
      (!Array.isArray(res) && res.cart && res.cart.length === 0)
    ) {
      task.updateTaskStatus({ message: 'Size sold out', type: TaskStatusType.Error });
      await task.retry();
    }
  } else if (/.*(checkout|status).json$/.test(url)) {
    const checkoutResponse = (await response.json()) as Supreme.CheckoutResponse;
    if (!checkoutResponse.status) return;

    await task.parseStatus(checkoutResponse);
  }
}
