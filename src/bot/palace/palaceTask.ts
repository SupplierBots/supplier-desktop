import { Browser } from 'puppeteer';
import { Task } from 'types/Task';
import * as R from 'ramda';
import { Product } from 'types/Product';
import { postRequest } from 'bot/requests/puppeteerExtensions';
import { PalaceMonitors } from 'types/PalaceMonitors';

interface CartPayload {
  updates: {
    [key: string]: 1;
  };
}

const palaceTask = async (browser: Browser, task: Task, monitor: PalaceMonitors) => {
  const pages = await browser.pages();
  const page = R.last(pages);
  if (!page) return;
  const cookies = await page.cookies('https://shop.palaceskateboards.com/');
  await page.deleteCookie(...cookies);
  await page.goto('https://shop.palaceskateboards.com/cart');
  addToCart();

  async function addToCart() {
    if (!page) return;

    let variantsPromises: Promise<number>[] = [];
    for (const product of task.products) {
      variantsPromises.push(getProductVariant(product));
    }
    const variants = await Promise.all(variantsPromises);
    const payload: CartPayload = { updates: {} };
    const availableVariants = variants.filter(v => v !== -1);
    availableVariants.forEach(v => (payload.updates[v.toString()] = 1));
    const response = await postRequest(page, '/cart/update.js', payload);
    if (response.success) await page.reload();
    //span[contains(text(),'I agree')]
    setTimeout(async () => {
      const checkbox = await page.$('.checkbox-msg');
      if (checkbox) await checkbox.tap();
    }, 3000);
  }

  async function getProductVariant(product: Product) {
    const fetcher = await monitor.eu.getProductFetcher(product);
    const variants = await fetcher?.get();
    const selectedVariant = variants?.find(v => v.name === product.size?.value.toLowerCase());
    if (!selectedVariant) return -1;
    return selectedVariant.id;
  }
};

export { palaceTask };
