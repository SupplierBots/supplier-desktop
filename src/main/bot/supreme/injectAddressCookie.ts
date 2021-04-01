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
  } = this.profile;

  if (this.region === 'us') {
    telephone = telephone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }

  const value = `${firstName} ${lastName}|${address1}|${address2}||${city}||${postcode}|${country?.value}|${email}|${telephone}`
    .replace(/ /g, '%20')
    .replace(/@/g, '%40');

  await this.agent.activeTab.cookieStorage.setItem('address', value, {
    expires:
      moment()
        .add(6, 'month')
        .valueOf() / 1000,
    httpOnly: false,
    secure: true,
    sameSite: 'None',
  });
}
