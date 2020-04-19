import { getPageContent } from './pageContent';
import { HarvesterData } from '../../types/HarvesterData';
import { BrowserWindow } from 'electron';
import { ipcMain } from 'electron-better-ipc';

class Harvester {
  private sitekey: string;
  public solving = false;
  public ready = false;

  constructor(readonly browser: BrowserWindow, readonly data: HarvesterData, sitekey: string) {
    this.sitekey = sitekey;
  }

  public init = async () => {
    this.ready = false;
    this.solving = false;

    this.browser.webContents.session.protocol.uninterceptProtocol('http');
    this.browser.webContents.session.protocol.interceptStringProtocol('http', (req, handler) => {
      if (req.url === 'http://www.supremenewyork.com/') {
        handler({
          mimeType: 'text/html',
          charset: 'UTF-8',
          data: getPageContent(this.sitekey),
        });
      }
    });

    this.browser.loadURL('http://www.supremenewyork.com/');

    this.browser.once('ready-to-show', () => {
      this.browser.webContents.send('set-email', this.data.accountEmail);
    });

    this.browser.webContents.once('did-finish-load', async () => {
      this.browser.show();
      await new Promise(resolve => setTimeout(resolve, 1500));
      this.ready = true;
    });
  };

  public reload = async () => {
    this.ready = false;
    this.browser.reload();
    await new Promise(resolve => setTimeout(resolve, 2500));
    this.browser.webContents.send('set-email', this.data.accountEmail);
    this.ready = true;
  };

  public getCaptchaToken = async (sitekey = this.sitekey) => {
    this.solving = true;

    if (sitekey !== this.sitekey) {
      this.sitekey = sitekey;
      await this.reload();
    }

    const token = await ipcMain.callRenderer<null, string>(this.browser, 'solve-captcha');
    this.solving = false;
    return token;
  };
}

export { Harvester };
