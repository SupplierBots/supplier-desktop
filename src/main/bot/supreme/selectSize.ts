import _ from 'lodash';
import { SupremeTask } from './SupremeTask';

export async function selectSize(this: SupremeTask) {
  if (this.product.size?.label.includes('None')) return true;

  const select = await this.document.querySelector(`select:not(#qty)`);

  if (!select) return true;

  const sizes = await Promise.all(
    [...(await select.querySelectorAll('option'))].map(async o => {
      const innerText = await o.innerText;
      return innerText.trim().toLowerCase();
    }),
  );

  if (sizes.length === 0) return false;

  const sizeValue = this.product.size!.value;
  const sizeToFind = (sizeValue.includes('SHOE')
    ? convertShoeSize(sizeValue, this.region)
    : sizeValue
  ).toLowerCase();

  if (sizes.includes(sizeToFind)) {
    await this.selectOption(select, sizeToFind);
    return true;
  }

  if (!this.product.anySize) return false;

  const anySizeOption = this.product.anySizeOption!.value;
  let secondarySize: string;

  switch (anySizeOption) {
    case 'largest':
      secondarySize = _.last(sizes)!;
      break;
    case 'smallest':
      secondarySize = _.first(sizes)!;
      break;
    case 'random':
    default:
      secondarySize = _.sample(sizes)!;
      break;
  }
  await this.selectOption(select, secondarySize);
  return true;
}

function convertShoeSize(size: string, region: string) {
  switch (size) {
    case 'SHOE-US4': {
      return region === 'eu' ? 'US 4 / UK 3.5' : '4';
    }
    case 'SHOE-US4.5': {
      return region === 'eu' ? 'US4.5 / UK 4' : '4.5';
    }
    case 'SHOE-US5': {
      return region === 'eu' ? 'US 5 / UK 4.5' : '5';
    }
    case 'SHOE-US5.5': {
      return region === 'eu' ? 'US 5.5 / UK 5' : '5.5';
    }
    case 'SHOE-US6': {
      return region === 'eu' ? 'US 6 / UK 5.5' : '6';
    }
    case 'SHOE-US6.5': {
      return region === 'eu' ? 'US 6.5 / UK 6' : '6.5';
    }
    case 'SHOE-US7': {
      return region === 'eu' ? 'US 7 / UK 6' : '7';
    }
    case 'SHOE-US7.5': {
      return region === 'eu' ? 'US 7.5 / UK 6.5' : '7.5';
    }
    case 'SHOE-US8': {
      return region === 'eu' ? 'US 8 / UK 7' : '8';
    }
    case 'SHOE-US8.5': {
      return region === 'eu' ? 'US 8.5 / UK 7.5' : '8.5';
    }
    case 'SHOE-US9': {
      return region === 'eu' ? 'US 9 / UK 8' : '9';
    }
    case 'SHOE-US9.5': {
      return region === 'eu' ? 'US 9.5 / UK 8.5' : '9.5';
    }
    case 'SHOE-US10': {
      return region === 'eu' ? 'US 10 / UK 9' : '10';
    }
    case 'SHOE-US10.5': {
      return region === 'eu' ? 'US 10.5 / UK 9.5' : '10.5';
    }
    case 'SHOE-US11': {
      return region === 'eu' ? 'US 11 / UK 10' : '11';
    }
    case 'SHOE-US11.5': {
      return region === 'eu' ? 'US 11.5 / UK 10.5' : '11.5';
    }
    case 'SHOE-US12': {
      return region === 'eu' ? 'US 12 / UK 11' : '12';
    }
    case 'SHOE-US13': {
      return region === 'eu' ? 'US 13 / UK 12' : '13';
    }
    default: {
      return size;
    }
  }
}
