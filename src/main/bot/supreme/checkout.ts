import { TaskStatusType } from '../../types/TaskStatus';
import { HarvestersManager } from '../harvesters/HarvestersManager';
import { selectors } from './selectors';
import { SupremeTask } from './SupremeTask';

export async function checkout(this: SupremeTask) {
  const checkoutButtonSelector = ".checkout, [href*='checkout']";
  await this.browser.waitForElement(checkoutButtonSelector, { visible: true });
  const checkoutButton = await this.document.querySelector(checkoutButtonSelector);
  await this.browser.waitForResponse(/checkout/, async () => {
    await checkoutButton!.click();
  });
  await this.browser.waitForDOMContentLoaded();
  await this.waitForTicket();
  const addToCartTime = Date.now();

  await this.browser.waitForElement("input[type='text']", {
    visible: true,
  });
  const termsLabel = await this.document.queryXPath(selectors.termsLabel);
  const bounds = await termsLabel!.bounds;
  const { x, y, height, width } = bounds;
  await this.browser.click(x + width / 2, y + height / 2);
  const creditCardNumberInput = await this.document.queryXPath(selectors.creditCardNumber);
  await creditCardNumberInput?.autofill(this.profile.creditCardNumber.replace(/ /g, ''));
  const monthSelect = await this.document.queryXPath(selectors.monthSelect);
  await monthSelect?.selectOption(this.profile.month!.value);
  const yearSelect = await this.document.queryXPath(selectors.yearSelect);
  await yearSelect?.selectOption(this.profile.year!.value);
  const cvvInput = await this.document.queryXPath(selectors.cvv);
  await cvvInput?.autofill(this.profile.cvv);

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
  let sitekey = '6LeWwRkUAAAAAOBsau7KpuC9AV-6J8mhw4AjC3Xz';
  let callback = 'checkoutAfterCaptcha';

  if (captcha) {
    const captchaDataset = await captcha.dataset;

    if (captchaDataset.callback) {
      callback = captchaDataset.callback;
    }

    if (captchaDataset.sitekey) {
      sitekey = captchaDataset.sitekey;
    }
  }

  const captchaToken = await HarvestersManager.getCaptchaToken(sitekey);

  await this.browser.evaluate(`$('[id*="g-recaptcha-response"]').html('${captchaToken}');`);
  await this.browser.evaluate(`${callback}();`);
  this.updateTaskStatus({
    message: 'Waiting for response',
    type: TaskStatusType.Action,
  });
}
