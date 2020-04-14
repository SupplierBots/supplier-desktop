import { Page, Request } from 'puppeteer';
import { getPageContent } from './pageContent';
import { HarvesterData } from '../../types/HarvesterData';

class Harvester {
  private sitekey: string;
  public solving = false;
  public ready = false;

  constructor(readonly page: Page, readonly data: HarvesterData, sitekey: string) {
    this.sitekey = sitekey;
  }

  public init = async () => {
    await this.page.setRequestInterception(true);
    this.page.on('request', this.parseRequest);

    this.page.on('domcontentloaded', () => {
      this.page.evaluate(`setEmail('${this.data.accountEmail}');`);
    });
    await this.load();
  };

  public load = async () => {
    this.ready = false;
    this.page.goto('https://www.supremenewyork.com/');
    await new Promise(resolve => setTimeout(resolve, 2500));
    this.ready = true;
  };

  public parseRequest = (request: Request) => {
    if (request.url().includes('supremenewyork')) {
      request.respond({
        status: 200,
        contentType: 'text/html',
        body: getPageContent(this.sitekey),
      });
    } else {
      request.continue();
    }
  };

  public getCaptchaToken = async (sitekey = this.sitekey) => {
    if (sitekey !== this.sitekey) {
      this.sitekey = sitekey;
      await this.load();
    }

    this.solving = true;
    await this.page.evaluate('executeCaptcha();');
    const request = await this.page.waitForRequest('http://127.0.0.1:2140/captcha.json', {
      timeout: 0,
    });
    const data = request.postData() || "{token: 'invalid'}";
    const { token } = JSON.parse(data) as { token: string };
    this.solving = false;
    return token;
  };
}

export { Harvester };
