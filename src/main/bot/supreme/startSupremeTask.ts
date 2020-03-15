import { Browser } from 'puppeteer';
import { Task } from '../../types/Task';
import * as R from 'ramda';
import selectors from './selectors';

import { IPCMain } from '../../IPC/IPCMain';
import { injectScript } from './pageInject/injectScript';
import { getVisibleElement, selectOption, prepareCookies } from './browserExtensions';
import { parseResponse } from './parseResponse';
import { TaskStatusType } from '../../types/TaskStatus';
import { parseRequest } from './parseRequest';
import { Supreme } from '../../types/Supreme';
import { ProductsMonitor } from './ProductsMonitor';

const startSupremeTask = async (browser: Browser, task: Task) => {
  const pages = await browser.pages();
  const page = R.last(pages);
  let monitorStock: Supreme.Stock;

  if (!page || !task.profile) return;

  const profile = await IPCMain.getProfile(task.profile.value);

  const [product] = task.products;

  page.on('load', async () => {
    const fullUrl = (await page.evaluate('window.location.href')) as string;
    if (fullUrl.includes('supplier')) {
      const source = injectScript(product);
      await page.evaluate(source);
    }
  });

  page.on('request', req => parseRequest(req, page, task));
  page.on('response', res => parseResponse(res, page, task, retry));

  const monitor = ProductsMonitor.subscribe(setStock);

  await handleTask();

  function setStock(stock: Supreme.Stock) {
    monitorStock = { ...stock };
    console.log(monitorStock);
  }

  async function retry() {
    if (!page || !profile) return;
    await new Promise(resolve => setTimeout(resolve, 1000));
    await prepareCookies(page, profile);
    await page.goto('https://www.supremenewyork.com/mobile/#supplier');
    await page.reload();
    await handleTask();
  }

  async function handleTask() {
    if (!page) return;
    if (!profile || !profile.month?.value || !profile.year?.value) return;

    await prepareCookies(page, profile);

    IPCMain.updateTaskStatus(task, {
      message: 'Waiting for products',
      type: TaskStatusType.Action,
    });

    await page.goto('https://www.supremenewyork.com/mobile/#supplier');

    const start = Date.now();

    await page.waitForXPath(selectors.cardTypeSelect, { visible: true, timeout: 1000 * 60 * 30 });

    IPCMain.updateTaskStatus(task, {
      message: 'Checking out',
      type: TaskStatusType.Action,
    });

    const addToCartTime = Date.now();

    await selectOption(page, selectors.cardTypeSelect, 'master');
    await selectOption(page, selectors.monthSelect, profile.month.value);
    await selectOption(page, selectors.yearSelect, profile.year.value);

    const number = await getVisibleElement(page, selectors.creditCardNumber);
    await number.tap();
    await number.type(profile.creditCardNumber);

    const cvv = await getVisibleElement(page, selectors.cvv);
    await cvv.tap();
    await cvv.type(profile.cvv.toString());

    const terms = await getVisibleElement(page, selectors.termsLabel, false);
    await terms.tap();

    const checkoutTime = Date.now() - addToCartTime.valueOf();

    const delay =
      typeof task.checkoutDelay === 'string' ? parseInt(task.checkoutDelay) : task.checkoutDelay;

    if (checkoutTime < delay) {
      IPCMain.updateTaskStatus(task, {
        message: 'Checkout delay',
        type: TaskStatusType.Action,
      });

      const requiredDelay = delay - checkoutTime;
      await new Promise(resolve => setTimeout(resolve, requiredDelay));
    }

    const processBtn = await getVisibleElement(page, selectors.processBtn, false);
    await processBtn.tap();

    IPCMain.updateTaskStatus(task, {
      message: 'Waiting for response',
      type: TaskStatusType.Action,
    });

    console.log(Date.now() - start);
  }
};

export { startSupremeTask };
