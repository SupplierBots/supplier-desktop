import { Profile } from '../../../types/Profile';
import { SetCookie } from 'puppeteer-core';
import SupremeHybridTask from './SupremeHybridTask';

function generateJSAddressCookie(
  {
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
  }: Profile,
  task: SupremeHybridTask,
): SetCookie {
  if (task.region === 'us') {
    telephone = telephone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }

  const value = `${firstName} ${lastName}|${email}|${telephone}|${address1}|${address2}|${city}|${
    task.region === 'us' ? region?.value : 'undefined'
  }|${postcode}|${country?.value}|`
    .replace(/ /g, '%20')
    .replace(/@/g, '%40');

  return {
    name: 'js-address',
    value: value,
    domain: 'www.supremenewyork.com',
  };
}

export async function prepareCookies(this: SupremeHybridTask) {
  if (!this.profile || !this.page) return;
  const cookies = await this.page.cookies('https://www.supremenewyork.com/');
  await this.page.deleteCookie(...cookies);
  this.setAddressCookie();
}

export async function setAddressCookie(this: SupremeHybridTask) {
  if (!this.profile || !this.page) return;
  await this.page.setCookie(generateJSAddressCookie(this.profile, this));
}
