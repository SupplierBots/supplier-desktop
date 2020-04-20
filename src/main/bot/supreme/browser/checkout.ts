import SupremeTask from './SupremeTask';
import { TaskStatusType } from '../../../types/TaskStatus';
import { selectors } from './selectors';
import { waitTicket } from '../pageInject/waitTicket';
import moment from 'moment';
import uuid from 'uuid-random';
import { HarvestersManager } from '../../../bot/harvesters/HarvestersManager';

export async function checkout(this: SupremeTask) {
  if (
    !this.profile ||
    !this.profile.month?.value ||
    !this.profile.year?.value ||
    !this.profile.creditCardType?.value
  )
    return;

  const addToCartTime = Date.now();
  await new Promise(resolve => setTimeout(resolve, 500));
  const checkoutButton = await this.getVisibleElement(selectors.checkoutBtn);
  await checkoutButton.tap();

  await this.page.waitForXPath(selectors.creditCardNumber, { visible: true, timeout: 0 });

  this.updateTaskStatus({
    message: 'Checking out',
    type: TaskStatusType.Action,
  });

  const { creditCardType, month, year, creditCardNumber, cvv } = this.profile;

  if (this.region === 'eu') {
    await this.selectOption(selectors.cardTypeSelect, creditCardType.value);
  }

  await this.selectOption(selectors.monthSelect, month.value);
  await this.selectOption(selectors.yearSelect, year.value);

  const numberInput = await this.getVisibleElement(selectors.creditCardNumber);
  await numberInput.tap();
  await numberInput.type(creditCardNumber);

  const cvvInput = await this.getVisibleElement(selectors.cvv);
  await cvvInput.tap();
  await cvvInput.type(cvv.toString());

  const termsCheckbox = await this.getVisibleElement(selectors.termsLabel, false);
  await termsCheckbox.tap();

  if (this.region === 'eu') {
    const cardinalID = uuid();
    await this.page.evaluate(
      `$('#checkout-form').prepend($('<input type="hidden" name="cardinal_id" value="0_${cardinalID}" external="true">'));`,
    );

    console.log(`[Checkout] Generated cardinal id: 0_${cardinalID}`);
  }

  const checkoutTime = Date.now() - addToCartTime.valueOf();
  const delay =
    typeof this.task.checkoutDelay === 'string'
      ? parseInt(this.task.checkoutDelay)
      : this.task.checkoutDelay;

  if (checkoutTime < delay) {
    this.updateTaskStatus({
      message: 'Checkout delay',
      type: TaskStatusType.Action,
    });

    const requiredDelay = delay - checkoutTime;
    await new Promise(resolve => setTimeout(resolve, requiredDelay));
  }

  await this.page.evaluate(waitTicket());

  const sitekey = (await this.page.evaluate(`$('#g-recaptcha').attr('data-sitekey');`)) as string;

  this.updateTaskStatus({
    message: 'Waiting for captcha',
    type: TaskStatusType.Action,
  });
  const captchaToken = await HarvestersManager.getCaptchaToken(sitekey);
  await this.page.evaluate(`$('[id*="g-recaptcha-response"]').html('${captchaToken}');`);

  if (this.region === 'eu') {
    await this.page.evaluate(`$('input[name*="cardinal"]:not([external="true"])').remove();`);
  }

  await this.page.evaluate(`window.recaptchaCallback();`);
  this.submitTime = moment();

  this.updateTaskStatus({
    message: 'Waiting for response',
    type: TaskStatusType.Action,
  });
}
