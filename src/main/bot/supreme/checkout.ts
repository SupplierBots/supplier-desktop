import moment from 'moment';
import { TaskStatusType } from '../../types/TaskStatus';
import { HarvestersManager } from '../harvesters/HarvestersManager';
import { selectors } from './selectors';
import { SupremeTask } from './SupremeTask';

export async function checkout(this: SupremeTask) {
  const checkoutButtonSelector = ".checkout, [href*='checkout']";
  await this.browser.waitForElement(checkoutButtonSelector, { visible: true });
  const checkoutButton = await this.document.querySelector(checkoutButtonSelector);
  await checkoutButton?.click();
  await this.browser.waitForResourcesLoad();

  const addToCartTime = Date.now();

  await this.browser.waitForElement("input[type='text']", {
    visible: true,
  });

  const startAutofill = Date.now();

  const terms = await this.document.queryXPath(selectors.termsLabel);
  await terms?.tickCheckbox();
  await this.autofillInput(
    selectors.creditCardNumber,
    this.profile.creditCardNumber.replace(/ /g, ''),
  );
  const monthSelect = await this.document.queryXPath(selectors.monthSelect);
  await monthSelect?.selectOption(this.profile.month!.value);
  const yearSelect = await this.document.queryXPath(selectors.yearSelect);
  await yearSelect?.selectOption(this.profile.year!.value);
  await this.autofillInput(selectors.cvv, this.profile.cvv);

  console.log(Date.now() - startAutofill);
  console.log(moment().valueOf() - this.startTimestamp.valueOf());

  const checkoutTime = Date.now() - addToCartTime.valueOf();

  if (checkoutTime < this.checkoutDelay) {
    this.updateTaskStatus({
      message: 'Checkout delay',
      type: TaskStatusType.Action,
    });
    const requiredDelay = this.checkoutDelay - checkoutTime;
    await new Promise(resolve => setTimeout(resolve, requiredDelay));
  }

  this.updateTaskStatus({
    message: 'Waiting for captcha',
    type: TaskStatusType.Action,
  });

  const captcha = await this.document.querySelector('.g-recaptcha, #g-recaptcha');
  this.sitekey = '6LeWwRkUAAAAAOBsau7KpuC9AV-6J8mhw4AjC3Xz';
  let callback = 'checkoutAfterCaptcha';

  if (captcha) {
    const captchaDataset = await captcha.dataset;

    if (captchaDataset.callback) {
      callback = captchaDataset.callback;
    }

    if (captchaDataset.sitekey) {
      this.sitekey = captchaDataset.sitekey;
    }
  }

  const captchaToken = await HarvestersManager.getCaptchaToken(this.sitekey);

  await this.browser.evaluate(`$('[id*="g-recaptcha-response"]').html('${captchaToken}');`);
  await this.browser.evaluate(`${callback}();`);
  this.updateTaskStatus({
    message: 'Waiting for response',
    type: TaskStatusType.Action,
  });
}
