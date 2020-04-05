import fs, { WriteStream } from 'fs-extra';
import { app } from 'electron';
import moment from 'moment';
import { Page, Request, Response } from 'puppeteer';

const parseData = (value?: string) => {
  try {
    return JSON.parse(value ?? '{}');
  } catch (e) {
    return value;
  }
};

const getResponseContent = async (response: Response) => {
  try {
    return await response.json();
  } catch {
    return await response.text();
  }
};

class Logger {
  private stream: WriteStream;
  public constructor(private readonly id: string, private readonly page: Page) {
    this.stream = fs.createWriteStream(
      `${app.getAppPath()}/logs/${this.id}${moment().format('-kk-mm-ss')}.log`,
    );
  }

  public reportRequest = (req: Request) => {
    const url = req.url();
    const data = req.postData();
    const headers = req.headers();
    const contentType = headers['content-type'];
    if (!contentType) return;
    if (
      process.env.NODE_ENV === 'development' &&
      /(supremenewyork|commerce|d17ol771963kd3)/.test(url) &&
      !url.includes('mobile_stock') &&
      (contentType.includes('json') || contentType.includes('form'))
    ) {
      this.writeObject({
        message: `${req.method()} ${req.url()}`,
        headers: req.headers(),
        data: parseData(data),
      });
    }
  };

  public reportResponse = async (response: Response) => {
    const url = response.url();
    if (
      process.env.NODE_ENV === 'development' &&
      /(supremenewyork|commerce|d17ol771963kd3)/.test(url) &&
      !url.includes('mobile_stock')
    ) {
      const headers = response.headers();
      const contentType = headers['content-type'];
      if (contentType.includes('json') || contentType.includes('form')) {
        const res = await getResponseContent(response);
        this.writeObject({
          message: `RESPONSE ${response.status()} ${response.url()}`,
          headers,
          response: res,
        });
      } else if (contentType.includes('javascript') || contentType.includes('wasm')) {
        const log = {
          message: `Detected new file!`,
          file: response.url(),
        };
        this.writeObject(log, false);
      }
    }
  };

  public writeObject = async (message: any, includeCookies = true) => {
    message.time = moment().format('kk:mm:ss:SSS');
    if (includeCookies) {
      const cookies = await this.page.cookies('https://www.supremenewyork.com/');
      const blacklisted = ['_utm', 'js-address', 'mixpanel'];
      message.cookies = cookies.filter(({ name }) => !blacklisted.some(b => name.includes(b)));
    }
    try {
      this.stream.write('\n' + JSON.stringify(message, null, 1));
    } catch {}
  };

  public writeString = (message: string, includeCookies = true) => {
    this.writeObject({ message }, includeCookies);
  };
}

export { Logger };
