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
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
  { value: 'xlarge', label: 'XLarge' },
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
