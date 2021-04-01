import { TaskStatusType } from '../../types/TaskStatus';
import { LocationStatus } from 'secret-agent';
import { HarvestersManager } from '../harvesters/HarvestersManager';
import { selectors } from './selectors';
import { SupremeTask } from './SupremeTask';

export async function checkout(this: SupremeTask) {
  const checkoutButton = this.document.querySelector(".checkout, [href*='checkout']");
  await this.agent.waitForElement(checkoutButton, { waitForVisible: true });

  const lastCommandId = await this.agent.activeTab.lastCommandId;
  await this.agent.interact({ click: checkoutButton });
  await this.agent.waitForResource({ url: /checkout/ }, { sinceCommandId: lastCommandId });
  await this.agent.activeTab.waitForLoad(LocationStatus.DomContentLoaded);
  await this.waitForTicket(lastCommandId);
  const addToCartTime = Date.now();

  const termsLabel = await this.queryXPath(selectors.termsLabel);
  const bounds = await termsLabel.getBoundingClientRect();
  const x = await bounds.x;
  const y = await bounds.y;
  const height = await bounds.height;
  const width = await bounds.width;
  await this.agent.interact({ click: [x + width / 2, y + height / 2] });

  const creditCardNumberInput = await this.queryXPath(selectors.creditCardNumber);
  await this.fillInput(creditCardNumberInput, this.profile.creditCardNumber.replace(/ /g, ''));
  const monthSelect = await this.queryXPath(selectors.monthSelect);
  await this.selectOption(monthSelect, this.profile.month!.value);
  const yearSelect = await this.queryXPath(selectors.yearSelect);
  await this.selectOption(yearSelect, this.profile.year!.value);
  const cvvInput = await this.queryXPath(selectors.cvv);
  await this.fillInput(cvvInput, this.profile.cvv);

  const checkoutTime = Date.now() - addToCartTime.valueOf();
  const delay =
    typeof this.details.checkoutDelay === 'string'
      ? parseInt(this.details.checkoutDelay)
      : this.details.checkoutDelay;

  if (checkoutTime < delay) {
    this.updateTaskStatus({
      message: 'Checkout delay',
      type: TaskStatusType.Action,
    });
    const requiredDelay = delay - checkoutTime;
    await new Promise(resolve => setTimeout(resolve, requiredDelay));
  }

  this.updateTaskStatus({
    message: 'Waiting for captcha',
    type: TaskStatusType.Action,
  });

  const captchaToken = await HarvestersManager.getCaptchaToken(
    '6LeWwRkUAAAAAOBsau7KpuC9AV-6J8mhw4AjC3Xz',
  );

  await this.evaluate(`$('[id*="g-recaptcha-response"]').html('${captchaToken}');`);
  await this.evaluate(`checkoutAfterCaptcha();`);

  this.updateTaskStatus({
    message: 'Waiting for response',
    type: TaskStatusType.Action,
  });
}
