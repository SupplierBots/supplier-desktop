import SupremeTask from '../supreme/browser/SupremeTask';
import { Cookie } from 'puppeteer';
import request from 'request-promise-native';
import { sleep } from './sleep';
import { Supreme } from '../../types/Supreme';

async function checkoutThroughRequest(
  this: SupremeTask,
  headers: Record<string, string>,
  postData: string,
): Promise<void> {
  if (!this.isActive) return;

  try {
    const cookies = await this.page.cookies();
    this.cookies = getCookieString(cookies);
    this.checkoutPostData = postData;

    const requestData: request.OptionsWithUri = {
      uri: 'https://www.supremenewyork.com/checkout.json',
      method: 'POST',
      headers,
      body: postData,
    };

    const response = await this.sendRequest<Supreme.CheckoutResponse>(requestData);

    if (response !== null && response.status) {
      parseCheckoutResponse(response);
      return;
    }

    await sleep(5000);
    console.log('restt');
    return this.checkoutThroughRequest(headers, postData);
  } catch (ex) {
    await sleep(5000);
    console.log('restt');
    return this.checkoutThroughRequest(headers, postData);
  }
}

async function parseCheckoutResponse(response: Supreme.CheckoutResponse) {
  console.log(response.slug);
}

function getCookieString(cookies: Cookie[]) {
  let result = '';
  for (let cookie of cookies) {
    result += `${cookie.name}=${cookie.value}; `;
  }

  return result;
}

export { checkoutThroughRequest };
