import { Response, Page } from 'puppeteer';
import { Supreme } from '../../types/Supreme';
import { Task } from '../../types/Task';
import { IPCMain } from '../../IPC/IPCMain';
import { TaskStatusType } from '../../types/TaskStatus';

const parseResponse = async (response: Response, page: Page, task: Task, retry: () => void) => {
  const url = response.url();

  if (/.*add.json$/.test(url)) {
    const res = (await response.json()) as Supreme.AddToCartResponse;
    if (res.length > 0) {
      IPCMain.updateTaskStatus(task, { message: 'Added to cart', type: TaskStatusType.Action });
    } else if (res.length === 0) {
      IPCMain.updateTaskStatus(task, { message: 'Size sold out', type: TaskStatusType.Error });
      retry();
    }
  } else if (/.*(checkout|status).json$/.test(url)) {
    const res = (await response.json()) as Supreme.CheckoutResponse;

    if (process.env.NODE_ENV === 'development') {
      console.log(res);
    }

    switch (res.status) {
      case 'failed':
      case '404':
      case '500':
      case 'outOfStock': {
        const message = res.status === 'outOfStock' ? 'Size sold out' : 'Failed. Retrying';
        IPCMain.updateTaskStatus(task, { message, type: TaskStatusType.Error });

        //Try again if failed
        retry();
        return;
      }

      case 'queued': {
        IPCMain.updateTaskStatus(task, { message: 'Queued', type: TaskStatusType.Action });
        return;
      }

      case 'dup': {
        IPCMain.updateTaskStatus(task, {
          message: 'Duplicate order',
          type: TaskStatusType.Error,
        });
        page.browser().close();
        return;
      }

      case 'paid': {
        IPCMain.updateTaskStatus(task, { message: 'Success', type: TaskStatusType.Success });
        page.browser().close();
        return;
      }
    }
  }
};

export { parseResponse };
