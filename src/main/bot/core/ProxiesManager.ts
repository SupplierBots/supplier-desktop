import { Proxy } from '../../types/Proxy';
import { AxiosProxyConfig } from 'axios';

class ProxiesManager {
  public static proxies: Proxy[] = [];

  public static setProxies(proxies: Proxy[], region: 'eu' | 'us') {
    this.proxies = proxies.filter(p => p.region?.value === region);
  }

  public static getRandomAxios() {
    const random = this.getRandom();
    if (!random) return false;
    const { ipPort, username, password, userPassAuth } = random;
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

  public static getRandom() {
    return this.proxies[Math.floor(Math.random() * this.proxies.length)];
  }
}

export default ProxiesManager;
