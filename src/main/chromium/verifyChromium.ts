import { app, IpcMainInvokeEvent } from 'electron';
import path from 'path';
import fs from 'fs-extra';
import puppeteer from 'puppeteer-extra';
import { config } from '../../config';

export const verifyChromium = async (e: IpcMainInvokeEvent) => {
  const appData = app.getPath('userData');
  const chromiumPath = path.resolve(appData, '.local-chromium');
  try {
    fs.accessSync(chromiumPath);
    const fetcher = puppeteer.createBrowserFetcher({
      path: chromiumPath,
    });

    const versions = await fetcher.localRevisions();
    if (versions.length < 1) return false;

    const executablePath = fetcher.revisionInfo(config.chromiumVersion).executablePath;

    const browser = await puppeteer.launch({
      executablePath,
      headless: true,
    });

    const page = await browser.newPage();
    await page.goto('http://example.com/');
    await browser.close();

    return { success: true, executablePath };
  } catch (ex) {
    console.log('Error while testing browser.');
    console.log(ex);
    fs.removeSync(chromiumPath);
    return { success: false, executablePath: 'fail' };
  }
};
