import * as Yup from 'yup';
export const productValidationSchema = Yup.object().shape({
  keywords: Yup.object().shape({
    positive: Yup.array().min(1),
    negative: Yup.array(),
    multi: Yup.array(),
  }),
  colors: Yup.object().shape({
    positive: Yup.array().min(1),
    negative: Yup.array(),
  }),
});

interface Keywords {
  positive: string[];
  negative: string[];
  multi?: string[];
}

export interface Product {
  keywords: Keywords | null;
  colors: Keywords | null;
}
export const initialProductsValues: Product = {
  keywords: null,
  colors: null,
};
