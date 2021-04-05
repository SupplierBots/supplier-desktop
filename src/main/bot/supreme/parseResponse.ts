import { SupremeTask } from './SupremeTask';
import { TaskStatusType } from '../../types/TaskStatus';
import { Supreme } from '../../types/Supreme';
import { Response } from '../browserEngines/interfaces/Response';

export async function parseResponse(this: SupremeTask, resource: Response) {
  const url = await resource.url;
  const status = await resource.statusCode;
  if (/.*checkout.json$/.test(url) && status !== 200) {
    this.updateTaskStatus({ message: `${status}. Retrying`, type: TaskStatusType.Error });
    await this.retry();
    return;
  }

  if (status !== 200) return;

  if (url === this.cardinalURL) {
    this.updateTaskStatus({ message: 'Awaiting 3D Secure', type: TaskStatusType.Action });
    return;
  }

  if (url.includes('cardinal.json')) {
    this.updateTaskStatus({ message: 'Submitting 3D Secure', type: TaskStatusType.Action });
    return;
  }

  if (/.*(checkout|status).json$/.test(url)) {
    const checkoutResponse = (await resource.json()) as Supreme.CheckoutResponse;
    if (!checkoutResponse.status) return;

    await this.parseStatus(checkoutResponse);
  }
}
