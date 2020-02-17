import cheerio from 'cheerio';
import * as R from 'ramda';
import autoRetryRequest from 'bot/requests/autoRetryRequest';
import { Palace } from 'types/Palace';
import { fetchOnce } from '../requests/fetchOnce';
import ProductFetcher from './ProductFetcher';
import { Keywords } from 'types/Keywords';
import { isMatch } from 'bot/keywordsManager';

export enum PageRegion {
  Us,
  Eu,
}

class ProductsMonitor {
  private products: Palace.ProductLocation[] = [];
  private productsPerPage = 30;

  private frontpageStatusUrl = `${this.websiteUrl}collections/frontpage.json`;
  private productsStatusUrl = `${this.websiteUrl}collections/new.json`;

  private frontpageUrl = `${this.websiteUrl}collections/frontpage?page=`;
  private productsUrl = `${this.websiteUrl}collections/new?page=`;

  private fetchPromise: Promise<void[]> | null = null;

  private get websiteUrl() {
    return `https://shop${this.region === PageRegion.Eu ? '' : '-usa'}.palaceskateboards.com/`;
  }

  constructor(private readonly region: PageRegion) {}

  public fetchProducts = fetchOnce(async () => {
    const productsAmount = await this.getProductsAmount();
    const pages = Math.ceil(productsAmount / this.productsPerPage);

    this.products = [];

    const requests: Promise<void>[] = [];
    for (let i = 1; i < pages + 1; i++) {
      requests.push(this.requestPage(i, true));
    }
    this.fetchPromise = Promise.all(requests);

    await this.fetchPromise;
    return this.products;
  });

  private getProductsAmount = async () => {
    const productsStatus = await autoRetryRequest<Palace.Collection>(this.productsStatusUrl, true);
    const productsCount = productsStatus.collection.products_count;
    if (productsCount > 0) return productsCount;

    const frontpageStatus = await autoRetryRequest<Palace.Collection>(
      this.frontpageStatusUrl,
      true,
    );
    return frontpageStatus.collection.products_count;
  };

  private requestPage = async (page: number, frontpage = false) => {
    const url = (frontpage ? this.frontpageUrl : this.productsUrl) + page;
    const response = await autoRetryRequest<string>(url);
    const $ = cheerio.load(response);
    const html = $('.product-grid-item');
    this.parseProductsHtml($, html);
  };

  public getProductFetcher = async (keywords: Keywords) => {
    await this.fetchProducts();
    const product = this.products.find(p => isMatch(p.name, keywords));
    if (!product) return null;
    if (!product.fetcher) product.fetcher = new ProductFetcher(product.url);
    return product.fetcher;
  };

  private parseProductsHtml = ($: CheerioStatic, html: Cheerio) => {
    html.each((i, product) => {
      const name = product.attribs['data-alpha'];
      const url = `${this.websiteUrl +
        $(product)
          .find('.product-link')
          .attr('href')}.js`;

      this.products.push({ name, url });
    });
  };
}

export default ProductsMonitor;
