import request from 'request-promise-native';

const headers = {
  accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-site': 'none',
  'upgrade-insecure-requests': '1',
  'user-agent':
    'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3803.0 Mobile Safari/537.36',
};

const autoRetryRequest = async <T>(url: string, json = false): Promise<T> => {
  try {
    const response = await request.get(url, {
      headers,
      timeout: 3000,
      encoding: 'utf-8',
      gzip: true,
    });
    return json ? (JSON.parse(response) as T) : (response as T);
  } catch (ex) {
    console.log(ex);
    return autoRetryRequest(url);
  }
};

export default autoRetryRequest;
