import fs from 'fs-extra';
import path from 'path';
import nw from '../NW';
import puppeteer from 'puppeteer';

const verifyChromium = async (): Promise<boolean> => {
  // * Missing typings for App properties
  const chromiumPath = path.resolve((nw as any).App.dataPath, '.local-chromium');
  try {
    fs.accessSync(chromiumPath);
    const fetcher = puppeteer.createBrowserFetcher({
      path: chromiumPath,
    });
    const versions = await fetcher.localRevisions();
    if (versions.length < 1) return false;
    const executablePath = fetcher.revisionInfo('674921').executablePath;
    const browser = await puppeteer.launch({
      executablePath,
      //headless: false,
    });
    const page = await browser.newPage();
    await page.goto('https://www.google.com/');
    await browser.close();
    return true;
  } catch (ex) {
    console.log('Error while testing browser.');
    console.log(ex);
    fs.removeSync(chromiumPath);
    return false;
  }
};

export default verifyChromium;
