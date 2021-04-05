import moment from 'moment';
import { SupremeTask } from './SupremeTask';

export async function injectAddressCookie(this: SupremeTask) {
  let {
    firstName,
    lastName,
    address1,
    address2,
    city,
    postcode,
    email,
    telephone,
    country,
    region,
  } = this.profile;

  const value = `${firstName} ${lastName}|${address1}|${address2}${
    this.region === 'eu' ? '|' : ''
  }|${city}|${this.region === 'us' ? region?.value : ''}|${postcode}|${
    country?.value
  }|${email}|${telephone.replace(/ /g, '')}`;

  await this.browser.setCookie({
    domain: 'www.supremenewyork.com',
    path: '/',
    name: 'address',
    value: encodeURIComponent(value).replace(/%20/g, '+'),
    expires: moment().add(6, 'month'),
    httpOnly: false,
    secure: true,
    sameSite: 'None',
  });
}
