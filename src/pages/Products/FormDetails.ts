import * as Yup from 'yup';
import { Product } from 'main/types/Product';
import { Option } from 'main/types/Option';

export const productValidationSchema = Yup.object().shape({
  id: Yup.string(),
  keywords: Yup.object().shape({
    positive: Yup.array(),
    negative: Yup.array(),
    multi: Yup.array(),
    keywordsAmount: Yup.number().min(1),
  }),
  colors: Yup.object().shape({
    positive: Yup.array(),
    negative: Yup.array(),
    keywordsAmount: Yup.number().min(1),
  }),

  size: Yup.object().required('Required'),
  anySize: Yup.boolean().required(),
  anyColor: Yup.boolean().required(),
  anySizeOption: Yup.object().when('anySize', {
    is: true, // alternatively: (val) => val == true
    then: Yup.object().required(),
    otherwise: Yup.object().nullable(),
  }),
  name: Yup.string().required('Required'),
  site: Yup.object().required(),
});

export const initialProductsValues: Product = {
  id: '',
  keywords: { positive: [], negative: [], multi: [], keywordsAmount: 0 },
  colors: { positive: [], negative: [], multi: [], keywordsAmount: 0 },
  size: null,
  anySize: false,
  anyColor: false,
  anySizeOption: null,
  name: '',
  site: null,
};

export const sizeOptions: Option[] = [
  { value: 'Small', label: 'Small' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Large', label: 'Large' },
  { value: 'XLarge', label: 'XLarge' },

  { value: '30', label: '30' },
  { value: '32', label: '32' },
  { value: '34', label: '34' },
  { value: '36', label: '36' },

  { value: '7 1/8', label: '7 1/8' },
  { value: '7 1/4', label: '7 1/4' },
  { value: '7 3/8', label: '7 3/8' },
  { value: '7 1/2', label: '7 1/2' },
  { value: '7 5/8', label: '7 5/8' },
  { value: '7 3/4', label: '7 3/4' },
  { value: 'S/M', label: 'S/M' },
  { value: 'M/L', label: 'S/M' },
  { value: 'L/XL', label: 'L/XL' },

  { value: 'US7', label: 'US 7/UK 6' },
  { value: 'US7.5', label: 'UK6.5 / US7.5' },
  { value: 'US8', label: 'UK7 / US8' },
  { value: 'US8.5', label: 'UK7.5 / US8.5' },
  { value: 'US9', label: 'UK8 / US9' },
  { value: 'US9.5', label: 'UK8.5 / US9.5' },
  { value: 'US10', label: 'UK9 / US10' },
  { value: 'US10.5', label: 'UK9.5 / US10.5' },
  { value: 'US11', label: 'UK10 / US11' },
  { value: 'US 11.5', label: 'UK10.5 / US 11.5' },
  { value: 'US12', label: 'UK11 / US12' },
  { value: 'US12.5', label: 'UK11.5 / US12.5' },
  { value: 'US13', label: 'UK12 / US13' },

  { value: '7.5', label: '7.5' },
  { value: '7.7', label: '7.7' },
  { value: '7.75', label: '7.75' },
  { value: '7.8', label: '7.8' },
  { value: '7.875', label: '7.875' },
  { value: '8', label: '8' },
  { value: '8.06', label: '8.06' },
  { value: '8.125', label: '8.125' },
  { value: '8.13', label: '8.13' },
  { value: '8.18', label: '8.18' },
  { value: '8.2', label: '8.2' },
  { value: '8.25', label: '8.25' },
  { value: '8.375', label: '8.375' },
  { value: '8.38', label: '8.38' },
  { value: '8.5', label: '8.5' },
  { value: '8.6', label: '8.6' },
  { value: '8.625', label: '8.625' },
  { value: '8.75', label: '8.75' },
  { value: '8.8', label: '8.8' },
  { value: '9', label: '9' },
  { value: '9.25', label: '9.25' },
  { value: '9.5', label: '9.5' },
  { value: '10', label: '10' },
];

export const anySizeOptions: Option[] = [
  { value: 'smallest', label: 'The Smallest' },
  { value: 'largest', label: 'The Largest' },
  { value: 'random', label: 'Random' },
];

export const productSiteOptions: Option[] = [
  { value: 'supreme', label: 'Supreme' },
  { value: 'palace', label: 'Palace' },
];
