import * as _ from 'lodash';
import { HarvesterData } from '../../types/HarvesterData';
import { screen, session, BrowserWindowConstructorOptions, BrowserWindow } from 'electron';
import path from 'path';
import { IPCMain } from '../../IPC/IPCMain';
import { setupHarvester } from './setupHarvester';
import { Harvester } from './Harvester';

class HarvestersManager {
  private static sitekey = '6LeWwRkUAAAAAOBsau7KpuC9AV-6J8mhw4AjC3Xz';
  private static harvesters: Harvester[] = [];

  public static async initialize(harvestersData: HarvesterData[]) {
    this.harvesters = [];

    harvestersData.forEach(async (harvester, index) => {
      const browser = await this.createBrowser(harvester, index);
      const instance = new Harvester(browser, harvester, this.sitekey);
      await instance.init();
      this.harvesters.push(instance);
    });
  }

  public static async getCaptchaToken(sitekey = this.sitekey): Promise<string> {
    const availableHarvester = this.getRandomAvailable();

    if (!availableHarvester) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return this.getCaptchaToken(sitekey);
    }

    const token = await availableHarvester.getCaptchaToken(sitekey);
    //console.log('[HarvestersManager] Returned token: ' + token);
    return token;
  }

  public static async closeAll() {
    this.harvesters.forEach(harvester => {
      harvester.browser.close();
    });
  }

  private static getRandomAvailable() {
    const availableHarvesters = this.harvesters.filter(h => h.ready && !h.solving);
    return availableHarvesters[Math.floor(Math.random() * availableHarvesters.length)];
  }

  public static async setupHarvester(harvesterData: HarvesterData) {
    try {
      const browser = await this.createBrowser(harvesterData, 0, true);
      setupHarvester(browser, harvesterData.id);
    } catch {
      IPCMain.harvesterStateChange(harvesterData.id, false);
    }
  }

  public static async disableHarvester(id: string) {
    this.harvesters = this.harvesters.filter(h => h.data.id !== id);
  }

  public static createBrowser = async (
    { id, proxy }: HarvesterData,
    index = 0,
    showFrame = false,
  ) => {
    IPCMain.harvesterStateChange(id, true);

    const width = 425;
    const height = 575;

    const proxyData = proxy.value !== 'none' ? await IPCMain.getProxy(proxy.value) : null;

    const ses = session.fromPartition(`persist:${id}`);
    ses.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
      'en-US,en',
    );

    if (proxyData) {
      ses.setProxy({
        proxyRules: `http://${proxyData.ipPort}`,
      });
    }

    const launchOptions: BrowserWindowConstructorOptions = {
      width,
      height,
      frame: showFrame,
      show: showFrame,
      resizable: false,
      maximizable: false,
      minimizable: false,
      fullscreenable: false,
      title: showFrame ? 'Google Login' : 'Captcha Harvester',
      titleBarStyle: showFrame ? 'default' : 'hiddenInset',
      backgroundColor: showFrame ? '#fff' : '#1b191c',
      webPreferences: {
        nodeIntegration: false,
        preload: path.join(__dirname, 'harvesterPreload.js'),
        backgroundThrottling: false,
        session: ses,
      },
    };

    const browser = new BrowserWindow(launchOptions);

    if (proxyData && proxyData.userPassAuth) {
      browser.webContents.on(
        'login',
        HarvestersManager.authenticateProxy(proxyData.username, proxyData.password),
      );
    }

    const screenSize = screen.getPrimaryDisplay().workAreaSize;
    const maxHorizontaly = Math.floor(screenSize.width / width);
    const x = index % maxHorizontaly;
    const y = Math.floor(index / maxHorizontaly + 1) - 1;

    browser.setPosition(x * width, y * height);

    browser.on('closed', () => {
      HarvestersManager.disableHarvester(id);
      IPCMain.harvesterStateChange(id, false);
    });

    browser.webContents.on('devtools-opened', () => {
      browser.close();
    });

    return browser;
  };

  private static authenticateProxy = (username: string, password: string) => (
    event: Electron.Event,
    details: Electron.AuthenticationResponseDetails,
    authInfo: Electron.AuthInfo,
    callback: (username?: string | undefined, password?: string | undefined) => void,
  ) => {
    if (authInfo.isProxy) {
      callback(username, password);
    }
    event.preventDefault();
  };
}

export { HarvestersManager };
