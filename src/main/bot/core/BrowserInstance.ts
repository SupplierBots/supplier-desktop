import path from 'path';
import puppeteer from 'puppeteer-extra';
import devices from 'puppeteer/DeviceDescriptors';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

import { app, screen } from 'electron';
import { Target } from 'puppeteer';
import { IPCMain } from '../../IPC/IPCMain';
import { config } from '../../../config';
import { Proxy } from '../../types/Proxy';

const BrowserInstance = async (id: string, proxy: Proxy | null = null, index = 0) => {
  IPCMain.harvesterStateChange(id, true);

  const appData = app.getPath('userData');
  const fetcher = puppeteer.createBrowserFetcher({
    path: path.resolve(appData, '.local-chromium'),
  });

  const executablePath = fetcher.revisionInfo(config.chromiumVersion).executablePath;
  const userDataDirectory = path.resolve(appData, id);
  const { width, height, deviceScaleFactor } = devices['Pixel 2'].viewport;

  puppeteer.use(StealthPlugin());

  const screenSize = screen.getPrimaryDisplay().workAreaSize;
  const maxHorizontaly = Math.floor((screenSize.width + 150) / 500);
  const y = Math.floor(index / maxHorizontaly + 1) - 1;
  const x = index % maxHorizontaly;

  const args = [
    '--no-sandbox',
    '--disable-gpu',
    '--disable-infobars',
    // '--disable-setuid-sandbox',
    // '--disable-dev-shm-usage',
    // '--ignore-certifcate-errors',
    // '--ignore-certifcate-errors-spki-list',
    `--user-data-dir=${userDataDirectory}`,
    `--window-size=${500},${550}`,
    `--window-position=${500 * x},${(height + 82) * y}`,
  ];

  if (proxy) {
    args.push(`--proxy-server=${proxy.ipPort}`);
  }

  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    ignoreDefaultArgs: ['--enable-automation'],
    args,
    executablePath,
  });

  const page = await browser.newPage();
  const [firstPage] = await browser.pages();
  await firstPage.close();

  if (proxy?.userPassAuth) {
    await page.authenticate({
      username: proxy.username,
      password: proxy.password,
    });
  }

  //const client = await page.target().createCDPSession();

  browser.on('targetcreated', (target: Target) => {
    if (target.url().includes('devtools')) {
      //browser.close();
    }
  });

  // client.send('Network.setUserAgentOverride', {
  //   userAgent:
  //     'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3882.0 Mobile Safari/537.36',
  //   locale: `en-US,en`,
  //   platform: 'linux',
  // });

  // await Promise.all([
  //   client.send('Emulation.setDeviceMetricsOverride', {
  //     mobile: true,
  //     width: 500,
  //     height: 450,
  //     deviceScaleFactor,
  //     screenOrientation: { angle: 0, type: 'portraitPrimary' },
  //   }),
  //   client.send('Emulation.setTouchEmulationEnabled', {
  //     enabled: true,
  //   }),
  //   client.send('Emulation.setEmitTouchEventsForMouse', {
  //     enabled: true,
  //     configuration: 'desktop',
  //   }),
  // ]);

  page.on('close', async () => {
    await browser.close();
  });

  browser.on('disconnected', async () => {
    IPCMain.harvesterStateChange(id, false);
  });

  return browser;
};
export default BrowserInstance;
