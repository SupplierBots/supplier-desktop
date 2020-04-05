import { Profile } from '../../../types/Profile';
import { SetCookie } from 'puppeteer';
import SupremeTask from './SupremeTask';

function generateJSAddressCookie({
  firstName,
  lastName,
  address1,
  address2,
  city,
  postcode,
  email,
  telephone,
}: Profile): SetCookie {
  const value = `${firstName} ${lastName}|${email}|${telephone}|${address1}|${address2}|${city}|undefined|${postcode}|PL|`
    .replace(/ /g, '%20')
    .replace(/@/g, '%40');
  return {
    name: 'js-address',
    value: value,
    domain: '.supremenewyork.com',
  };
}

export async function prepareCookies(this: SupremeTask) {
  if (!this.profile) return;
  const cookies = await this.page.cookies('https://www.supremenewyork.com/');
  await this.page.deleteCookie(...cookies);
  await this.page.setCookie(generateJSAddressCookie(this.profile));
  this.logger.writeObject({ message: 'Prepared cookies!' });
}
