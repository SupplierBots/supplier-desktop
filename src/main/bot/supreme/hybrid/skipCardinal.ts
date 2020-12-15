import { TaskStatusType } from '../../../types/TaskStatus';
import SupremeHybridTask from './SupremeHybridTask';

export async function skipCardinal(this: SupremeHybridTask): Promise<void> {
  if (!this.isActive || !this.page) return;

  await this.page.evaluate(
    `
			$.post("/checkout/${this.slug}/cardinal.json?verify=true", $("#mobile_checkout_form").serialize(), function(e) {
				e["status"] == "failed" ? ($("body").removeClass("checkout_page").addClass("cart-confirm"),
				$("#content").replaceWith(e.page)) : e["status"] == "cardinal_queued" && window.pollOrderStatus(e.slug)
			});
		`,
  );
  this.processingAttempt++;
  this.updateTaskStatus({
    message: `Processing (${this.processingAttempt})`,
    type: TaskStatusType.Action,
  });
}
