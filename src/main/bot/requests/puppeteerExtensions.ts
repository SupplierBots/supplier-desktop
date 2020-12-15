import { Serializable } from 'child_process';
import { Page } from 'puppeteer-core';

const postRequest = async <T>(page: Page, url: string, payload: Serializable) => {
  console.log(payload);
  try {
    //* See: https://github.com/puppeteer/puppeteer/issues/1665
    const response = await page?.evaluate(`(async() => {
      const response = await fetch(window.location.origin + "${url}", {
        method: 'POST',
        body: JSON.stringify(${JSON.stringify(payload)}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    })()`);
    return { success: true, response: response as T };
  } catch (ex) {
    return { success: false, response: null };
  }
};

export { postRequest };
