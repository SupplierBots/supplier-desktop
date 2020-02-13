import { setActive } from './../store/browsers/actions';
import { BrowserData } from '../types/BrowserData';
import store from 'store/configureStore';
import path from 'path';
import puppeteer from 'puppeteer-extra';
import devices from 'puppeteer/DeviceDescriptors';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

const BrowserInstance = async ({ id }: BrowserData) => {
  const executablePath = store.getState().controller.chromiumPath;
  const userDataDirectory = path.resolve(store.getState().controller.appData, id);
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
      `--window-size=${width},${height + 82}`,
      `--user-data-dir=${userDataDirectory}`,
    ],
    executablePath,
  });

  const page = await browser.newPage();
  const client = await page.target().createCDPSession();

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
    store.dispatch(setActive(id, false));
  });

  return browser;
};
export default BrowserInstance;
