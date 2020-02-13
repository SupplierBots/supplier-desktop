import store from 'store/configureStore';
import { renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import BrowserSetupPage from './BrowserSetupPage';
import React from 'react';

import { BrowserData } from 'types/BrowserData';
import { Page } from 'puppeteer';
import { setAccountEmail } from 'store/browsers/actions';

const setupBrowser = async (page: Page, { id }: BrowserData) => {
  const browser = page.browser();
  if (!page) {
    browser.close();
    return;
  }

  const sheet = new ServerStyleSheet();
  try {
    const html = renderToStaticMarkup(sheet.collectStyles(<BrowserSetupPage />));
    const styleTags = sheet.getStyleTags();
    await page.setContent(`<!DOCTYPE html>\n${styleTags}${html}`);
  } finally {
    sheet.seal();
  }

  page.on('load', async () => {
    const url = page.url();
    if (!url.includes('https://myaccount.google.com/')) return;
    const accountEmailElements = await page.$x("//div[contains(text(),'@gmail.com')]");
    if (accountEmailElements.length < 1) return;
    const [accountEmailNode] = accountEmailElements;
    let email = await page.evaluate(e => e.textContent, accountEmailNode);

    const sameEmails = store.getState().browsers.filter(b => b.accountEmail.includes(email));
    if (sameEmails.length > 0) {
      email += ` (${sameEmails.length + 1})`;
    }

    store.dispatch(setAccountEmail(id, email));
    browser.close();
  });

  await page.evaluate(() => {
    document.querySelector('button')?.addEventListener('click', () => {
      document.location.replace(
        'https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin&hl=en',
      );
    });
  });
};
export { setupBrowser };
