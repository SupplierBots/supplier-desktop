import * as Yup from 'yup';
export const productValidationSchema = Yup.object().shape({
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
  productName: Yup.string().required('Required'),
  productSite: Yup.object().required(),
});
export interface Option {
  value: string;
  label: string;
}

interface Keywords {
  positive: string[];
  negative: string[];
  multi?: string[];
  keywordsAmount: number;
}

export interface Product {
  keywords: Keywords | null;
  colors: Keywords | null;
  size: Option | null;
  anySize: boolean;
  anyColor: boolean;
  anySizeOption: Option | null;
  productName: string;
  productSite: Option | null;
}
export const initialProductsValues: Product = {
  keywords: null,
  colors: null,
  size: null,
  anySize: false,
  anyColor: false,
  anySizeOption: null,
  productName: '',
  productSite: null,
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
  { value: 'both', label: 'Both' },
];
