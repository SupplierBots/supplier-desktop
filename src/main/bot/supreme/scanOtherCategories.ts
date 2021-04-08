import { SupremeTask } from './SupremeTask';
import axios, { AxiosProxyConfig } from 'axios';
import { Proxy } from '../../types/Proxy';
import { Supreme } from '../../types/Supreme';
import { isMatch } from './isMatch';

export async function scanOtherCategories(this: SupremeTask) {
  try {
    const response = await axios.get<Supreme.Stock>(`https://www.supremenewyork.com/shop.json`, {
      proxy: getProxyString(this.proxy),
      timeout: 1500,
    });
    if (response.status !== 200 || !response.data.products_and_categories) return;
    const items: Supreme.Product[] = [];
    Object.values(response.data.products_and_categories).forEach(category =>
      items.push(...(category ?? [])),
    );
    const taskItem = items.find(i => isMatch(i.name, this.product.keywords));
    if (!taskItem?.category_name) return;
    return taskItem.category_name;
  } catch (ex) {
    console.log(ex);
  }
}

function getProxyString(proxy: Proxy | null) {
  if (!proxy) return false;

  const { ipPort, username, password, userPassAuth } = proxy;
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
}
