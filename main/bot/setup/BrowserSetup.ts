import { Page } from 'puppeteer';
import { ipcMain as ipc } from 'electron-better-ipc';
import { mainWindow } from '../../electron';
import { BrowserData } from 'types/BrowserData';

const setupBrowser = async (page: Page, id: string) => {
  const browser = page.browser();

  if (!page) {
    browser.close();
    return;
  }

  await page.goto(
    'https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin&hl=en',
  );

  page.on('load', async () => {
    if (!mainWindow) return;
    const url = page.url();
    if (!url.includes('https://myaccount.google.com/')) return;
    const accountEmailElements = await page.$x("//div[contains(text(),'@gmail.com')]");
    if (accountEmailElements.length < 1) return;
    const [accountEmailNode] = accountEmailElements;
    let email = await page.evaluate(e => e.textContent, accountEmailNode);

    const sameEmails = await ipc.callRenderer<string, BrowserData[]>(
      mainWindow,
      'GET_SAME_EMAILS',
      email,
    );

    if (sameEmails.length > 0) {
      email += ` (${sameEmails.length + 1})`;
    }
    ipc.sendToRenderers('SET_BROWSER_EMAIL', { id, email });
    browser.close();
  });
};
export { setupBrowser };
