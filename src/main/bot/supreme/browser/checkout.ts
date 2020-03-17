import SupremeTask from './SupremeTask';
import { TaskStatusType } from '../../../types/TaskStatus';
import { selectors } from './selectors';

export async function checkout(this: SupremeTask) {
  if (
    !this.profile ||
    !this.profile.month?.value ||
    !this.profile.year?.value ||
    !this.profile.creditCardType?.value
  )
    return;

  const start = Date.now();

  await this.page.waitForXPath(selectors.cardTypeSelect, { visible: true, timeout: 0 });

  this.updateTaskStatus({
    message: 'Checking out',
    type: TaskStatusType.Action,
  });

  const addToCartTime = Date.now();

  const { creditCardType, month, year, creditCardNumber, cvv } = this.profile;

  await this.selectOption(selectors.cardTypeSelect, creditCardType.value);
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

  const processBtn = await this.getVisibleElement(selectors.processBtn, false);
  await processBtn.tap();

  console.log(Date.now() - start);

  this.updateTaskStatus({
    message: 'Waiting for response',
    type: TaskStatusType.Action,
  });
}
