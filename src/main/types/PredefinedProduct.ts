import { Keywords } from 'main/types/Keywords';

export interface PredefinedProduct {
  name: string;
  keywords: Keywords;
  category: string;
}

export const predefinedProducts: PredefinedProduct[] = [
  {
    name: 'Basketball Sweatshirt',
    keywords: {
      positive: ['sweatshirt', 'basketball'],
      negative: [],
      multi: [],
    },
    category: 'sweatshirts',
  },
];
