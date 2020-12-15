import { TaskStatusType } from '../../../types/TaskStatus';
import { selectors } from './selectors';
import moment from 'moment';
import { HarvestersManager } from '../../harvesters/HarvestersManager';
import SupremeHybridTask from './SupremeHybridTask';

export async function autofillCheckout(this: SupremeHybridTask) {
  if (
    !this.page ||
    !this.profile ||
    !this.profile.month?.value ||
    !this.profile.year?.value ||
    !this.profile.creditCardType?.value
  )
    return;
  const addToCartTime = Date.now();

  this.stockMonitor.unsubscribe();

  try {
    await this.page.waitForXPath(selectors.creditCardNumber, { visible: true, timeout: 0 });

    this.updateTaskStatus({
      message: 'Checking out',
      type: TaskStatusType.Action,
    });

    const { creditCardType, month, year, creditCardNumber, cvv } = this.profile;

    const cardSelect = await this.page.$x(selectors.cardTypeSelect);
    if (this.region === 'eu' && cardSelect.length > 0) {
      await this.selectOption(selectors.cardTypeSelect, creditCardType.value);
    }

    await this.selectOption(selectors.monthSelect, month.value);
    await this.selectOption(selectors.yearSelect, year.value);

    const numberInput = await this.getVisibleElement(selectors.creditCardNumber, false);
    await numberInput?.tap();
    await numberInput?.type(creditCardNumber);

    const cvvInput = await this.getVisibleElement(selectors.cvv, false);
    await cvvInput?.tap();
    await cvvInput?.type(cvv.toString());

    const termsCheckbox = await this.getVisibleElement(selectors.termsLabel, false);
    await termsCheckbox?.tap();

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

    const sitekey = await this.saveEvaluate<string>(`$('#g-recaptcha').attr('data-sitekey');`);
    this.sitekey = sitekey ?? 'Unknown';

    this.updateTaskStatus({
      message: 'Waiting for captcha',
      type: TaskStatusType.Action,
    });

    const captchaToken = await HarvestersManager.getCaptchaToken(sitekey);

    await this.saveEvaluate(`$('[id*="g-recaptcha-response"]').html('${captchaToken}');`);
    await this.saveEvaluate("$('[name*=\"terms\"]').attr('checked', true);");
    await this.saveEvaluate(`window.recaptchaCallback();`);
    this.submitTime = moment();

    this.updateTaskStatus({
      message: 'Waiting for response',
      type: TaskStatusType.Action,
    });
  } catch (ex) {
    await this.retry();
  }
}
