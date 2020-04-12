import axios, { AxiosProxyConfig } from 'axios';
import { timer, merge, Observable, Subscription } from 'rxjs';
import {
  delay,
  distinctUntilChanged,
  map,
  switchMap,
  pluck,
  retryWhen,
  shareReplay,
} from 'rxjs/operators';

import { Supreme } from '../../types/Supreme';
import { getRandomString } from './browser/getRandomString';
import { Proxy } from '../../types/Proxy';

abstract class ProductsMonitor {
  private static observable: Observable<any>;
  private static subscriptions: Subscription[] = [];

  private constructor() {}

  public static init(refreshRate: number, proxies: Proxy[]) {
    this.unsubscribeAll();
    this.subscriptions = [];

    const desktopStockMonitor = timer(0, refreshRate).pipe(
      switchMap(() =>
        axios.get<string>(
          `https://www.supremenewyork.com/shop.json?${getRandomString()}=${getRandomString()}`,
          {
            transformResponse: res => res,
            proxy: this.getRandomProxy(proxies),
          },
        ),
      ),
      pluck('data'),
      retryWhen(err => err.pipe(delay(refreshRate))),
    );

    const mobileStockMonitor = timer(refreshRate / 2, refreshRate).pipe(
      switchMap(() =>
        axios.get<string>(
          `https://www.supremenewyork.com/mobile_stock.json?${getRandomString()}=${getRandomString()}`,
          {
            transformResponse: res => res,
            proxy: this.getRandomProxy(proxies),
          },
        ),
      ),
      pluck('data'),
      retryWhen(err => err.pipe(delay(refreshRate))),
    );

    this.observable = merge(desktopStockMonitor, mobileStockMonitor).pipe(
      distinctUntilChanged(),
      map(stock => {
        const stockJson = JSON.parse(stock) as Supreme.Stock;
        if (stockJson.error || !stockJson.products_and_categories) {
          throw new Error('Invalid response');
        }
        return stockJson;
      }),
      retryWhen(err => err.pipe(delay(refreshRate))),
      shareReplay({ refCount: true }),
    );
  }

  public static subscribe(fn: (value: Supreme.Stock) => void): Subscription {
    const subscription = this.observable.subscribe(fn);
    this.subscriptions.push(subscription);
    return subscription;
  }

  public static unsubscribeAll() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private static getRandomProxy = (proxies: Proxy[]) => {
    if (proxies.length === 0) return false;

    const { ipPort, username, password, userPassAuth } = proxies[
      Math.floor(Math.random() * proxies.length)
    ];
    const [host, port] = ipPort.split(':');
    const axiosProxy: AxiosProxyConfig = {
      host,
      port: parseInt(port),
    };

    if (userPassAuth) {
      axiosProxy.auth = {
        username,
        password,
      };
    }

    return axiosProxy;
  };
}

export { ProductsMonitor };
