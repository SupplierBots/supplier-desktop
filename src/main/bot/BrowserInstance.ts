import path from 'path';
import puppeteer from 'puppeteer-extra';
import devices from 'puppeteer/DeviceDescriptors';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

import { app } from 'electron';
import { Target } from 'puppeteer';
import { IPCMain } from '../IPC/IPCMain';
import { config } from '../../config';

const BrowserInstance = async (id: string, index = 0) => {
  IPCMain.browserStateChange(id, true);

  const appData = app.getPath('userData');
  const fetcher = puppeteer.createBrowserFetcher({
    path: path.resolve(appData, '.local-chromium'),
  });

  const executablePath = fetcher.revisionInfo(config.chromiumVersion).executablePath;
  const userDataDirectory = path.resolve(appData, id);
  const { width, height, deviceScaleFactor } = devices['Pixel 2'].viewport;

  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch({
    headless: false,
    devtools: false,
    ignoreHTTPSErrors: true,
    ignoreDefaultArgs: ['--enable-automation'],
    args: [
      '--disable-infobars',
      '--no-first-run',
      '--enable-features=NetworkService',
      `--user-data-dir=${userDataDirectory}`,
      `--window-size=${width},${height + 82}`,
      `--window-position=${0 + 500 * index},0`,
    ],
    executablePath,
  });

  const page = await browser.newPage();
  const client = await page.target().createCDPSession();

  browser.on('targetcreated', (target: Target) => {
    console.log(target.url());
    if (target.url().includes('devtools')) {
      //browser.close();
    }
  });

  client.send('Network.setUserAgentOverride', {
    userAgent:
      'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3803.0 Mobile Safari/537.36',
    locale: `en-US,en`,
    platform: 'linux',
  });

  await Promise.all([
    client.send('Emulation.setDeviceMetricsOverride', {
      mobile: true,
      width,
      height,
      deviceScaleFactor,
      screenOrientation: { angle: 0, type: 'portraitPrimary' },
    }),
    client.send('Emulation.setTouchEmulationEnabled', {
      enabled: true,
    }),
    client.send('Emulation.setEmitTouchEventsForMouse', {
      enabled: true,
      configuration: 'desktop',
    }),
  ]);

  page.on('close', async () => {
    await browser.close();
  });

  browser.on('disconnected', async () => {
    IPCMain.browserStateChange(id, false);
  });

  return browser;
};
export default BrowserInstance;
