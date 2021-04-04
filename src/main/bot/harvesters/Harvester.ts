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
    this.page.goto('https://www.supremenewyork.com/checkout');
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
    await this.page.waitForFunction(`isTokenReady()`, {
      timeout: 0,
    });

    const token = (await this.page.evaluate('getToken()')) as string;

    this.solving = false;
    return token;
  };
}

export { Harvester };
