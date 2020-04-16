import { Proxy } from '../../types/Proxy';
import { AxiosProxyConfig } from 'axios';

class ProxiesManager {
  public static proxies: Proxy[] = [];
  public static enabled = false;

  public static setProxies(enabled: boolean, proxies: Proxy[], region: 'eu' | 'us') {
    this.enabled = enabled;
    if (!enabled) {
      this.proxies = [];
      return;
    }
    this.proxies = proxies.filter(p => p.region?.value === region);
  }

  public static getRandomAxios() {
    if (!this.enabled) return false;
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

    console.log('[PROXIES MANAGER] Sent to axios: ' + ipPort);
    return axiosProxy;
  }

  public static getRandom() {
    return this.proxies[Math.floor(Math.random() * this.proxies.length)];
  }
}

export default ProxiesManager;
