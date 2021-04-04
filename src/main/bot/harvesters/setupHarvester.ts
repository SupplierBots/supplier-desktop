import { Page } from 'puppeteer';
import { IPCMain } from '../../IPC/IPCMain';
import _ from 'lodash';

const setupHarvester = async (page: Page, id: string) => {
  const browser = page.browser();
  IPCMain.setHarvesterEmail(id, `Not-Logged-${_.takeRight(id, 5).join('')}`);

  const cookies = await page.cookies('https://www.google.com/');
  await page.deleteCookie(...cookies);

  await page.goto(
    'https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin&hl=en',
  );

  page.on('load', async () => {
    const url = page.url();
    if (!url.includes('https://myaccount.google.com/')) return;

    await page.waitForXPath("//div[contains(text(),'@gmail.com')]");

    const accountEmailElements = await page.$x("//div[contains(text(),'@gmail.com')]");
    if (accountEmailElements.length < 1) return;
    const [accountEmailNode] = accountEmailElements;

    const emailProperty = await accountEmailNode.getProperty('innerText');
    let email = (await emailProperty.jsonValue()) as string;

    const sameEmails = await IPCMain.getSameEmails(email);

    if (sameEmails && sameEmails.length > 0) {
      email += ` (${sameEmails.length + 1})`;
    }
    IPCMain.setHarvesterEmail(id, email);
    browser.close();
  });
};
export { setupHarvester };
