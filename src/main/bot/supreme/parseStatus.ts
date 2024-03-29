import { TaskStatusType } from '../../types/TaskStatus';
import { Supreme } from '../../types/Supreme';
import { SupremeTask } from './SupremeTask';

export async function parseStatus(this: SupremeTask, checkoutResponse: Supreme.CheckoutResponse) {
  switch (checkoutResponse.status) {
    case 'cardinal_queued':
    case 'queued': {
      this.processingAttempt++;

      if (!this.slug && checkoutResponse.slug) {
        this.slug = checkoutResponse.slug;
      }

      this.queued = true;

      if (checkoutResponse.status === 'cardinal_queued') {
        this.updateTaskStatus({
          message: `Processing 3D Secure`,
          type: TaskStatusType.Action,
        });
      } else {
        this.updateTaskStatus({
          message: `Processing (${this.processingAttempt})`,
          type: TaskStatusType.Action,
        });
      }
      break;
    }
    case 'paid': {
      this.updateTaskStatus({
        message: 'Success',
        type: TaskStatusType.Success,
        additionalInfo: checkoutResponse.id,
      });
      this.sendWebhook(checkoutResponse);
      this.reportCheckout(checkoutResponse);
      await this.stop();
      break;
    }
    case 'dup': {
      this.updateTaskStatus({
        message: 'Duplicate order',
        type: TaskStatusType.Error,
      });
      this.sendWebhook(checkoutResponse);
      this.reportCheckout(checkoutResponse);
      await this.stop();
      break;
    }

    case 'blacklisted': {
      this.updateTaskStatus({
        message: 'Blacklisted',
        type: TaskStatusType.Error,
      });
      this.sendWebhook(checkoutResponse);
      this.reportCheckout(checkoutResponse);
      await this.stop();
      break;
    }
    case 'canada':
    case 'blocked_country': {
      this.updateTaskStatus({
        message: 'Country blocked',
        type: TaskStatusType.Error,
      });
      this.sendWebhook(checkoutResponse);
      this.reportCheckout(checkoutResponse);
      await this.stop();
      break;
    }
    case 'cca':
    case 'ccaf': {
      const { acs_url } = checkoutResponse;
      this.cardinalURL = acs_url ?? '';
      this.updateTaskStatus({ message: 'Loading 3D Secure', type: TaskStatusType.Action });
      this.cca = true;
      await this.browser.evaluate(`
            $.post("/checkout/${this.slug}/cardinal.json", $("#checkout_form").serialize()).done(function(e) {
                if (e.status === "failed")
                    return $("body").removeClass("checkout_page").addClass("cart-confirm"),
                    $("#content").replaceWith(e.page);
                if (e.status === "cardinal_queued")
                    return window.pollOrderStatus(e.slug)
            })
      `);
      break;
    }
    case '500':
    case '404':
    case 'outOfStock':
    case 'failed': {
      const message = checkoutResponse.status === 'outOfStock' ? 'Sold out' : 'Failed. Retrying';

      this.highTraffic = checkoutResponse.page?.includes('high traffic') ?? false;
      this.bParameter = !!checkoutResponse.b;

      if (checkoutResponse.errors) {
        try {
          this.billingErrors = JSON.stringify(checkoutResponse.errors);
        } catch {}
      }

      this.updateTaskStatus({ message, type: TaskStatusType.Error });
      this.sendWebhook(checkoutResponse);
      this.reportCheckout(checkoutResponse);
      await this.retry();
      break;
    }
  }
}
