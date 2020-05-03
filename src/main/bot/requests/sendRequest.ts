import requestPromise from 'request-promise-native';
import SupremeTask from '../supreme/browser/SupremeTask';

const baseHeaders = {
  accept: 'application/json',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'en-US,en;q=0.9',
  'cache-control': 'no-cache',
  connection: 'keep-alive',
  host: 'www.supremenewyork.com',
  pragma: 'no-cache',
  referer: 'https://www.supremenewyork.com/mobile/',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'user-agent':
    'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/81.0.4044.122 Mobile/15E148 Safari/604.1',
  'X-Requested-With': 'XMLHttpRequest',
};

const basePostHeaders = {
  ...baseHeaders,
  origin: 'https://www.supremenewyork.com',
  'content-type': 'application/x-www-form-urlencoded',
};

const request = requestPromise.defaults({
  json: true,
  gzip: true,
  resolveWithFullResponse: true,
  timeout: 5000,
  headers: baseHeaders,
});

export async function sendRequest<T>(
  this: SupremeTask,
  requestData: requestPromise.OptionsWithUri,
  mergeHeaders = true,
) {
  if (this.proxy) {
    requestData.proxy = this.proxy.userPassAuth
      ? `http://${this.proxy.ipPort}@${this.proxy.username}:${this.proxy.password}`
      : `http://${this.proxy.ipPort}`;
  }

  if (mergeHeaders) {
    requestData.headers = {
      ...requestData.headers,
      cookie: this.cookies,
      ...(requestData.method === 'POST' ? basePostHeaders : baseHeaders),
    };
  }

  console.log(requestData);
  const response = await request(requestData);
  console.log(response.headers['set-cookie']);
  return response.body as T;
}
