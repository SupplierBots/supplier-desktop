import * as Yup from 'yup';
import { Task } from 'main/types/Task';
import { TaskStatusType } from 'main/types/TaskStatus';
import { Option } from 'main/types/Option';
import { predefinedProducts } from '../../main/types/PredefinedProduct';

export const taskValidationSchema = Yup.object().shape({
  id: Yup.string(),
  profile: Yup.object().required(),
  proxy: Yup.object().required(),
  safeMode: Yup.boolean().required(),
  product: Yup.object().required(),
  colors: Yup.object().shape({
    positive: Yup.array(),
    negative: Yup.array(),
    keywordsAmount: Yup.number().min(1),
  }),
  size: Yup.object().required('Required'),
  anySize: Yup.boolean().required(),
  anyColor: Yup.boolean().required(),
  anySizeOption: Yup.object().when('anySize', {
    is: true,
    then: Yup.object().required(),
    otherwise: Yup.object().nullable(),
  }),
});

export const initialTaskValues: Task = {
  id: '',
  product: null,
  isActive: false,
  colors: { positive: [], negative: [], multi: [], keywordsAmount: 0 },
  size: null,
  anySize: false,
  anyColor: false,
  anySizeOption: null,
  profile: null,
  proxy: null,
  safeMode: true,
  status: {
    message: 'Inactive',
    type: TaskStatusType.Inactive,
  },
};

export const productsOptions: Option[] = predefinedProducts.map(p => ({
  value: p.name,
  label: p.name,
}));

export const sizeOptions: Option[] = [
  { value: 'None', label: 'None / One-Size' },
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

  { value: 'SHOE-US4', label: 'US 4 / UK 3.5' },
  { value: 'SHOE-US4.5', label: 'US4.5 / UK 4' },
  { value: 'SHOE-US5', label: 'US 5 / UK 4.5' },
  { value: 'SHOE-US5.5', label: 'US 5.5 / UK 5' },
  { value: 'SHOE-US6', label: 'US 6 / UK 5.5' },
  { value: 'SHOE-US6.5', label: 'US 6.5 / UK 6' },
  { value: 'SHOE-US7', label: 'US 7 / UK 6' },
  { value: 'SHOE-US7.5', label: 'US 7.5 / UK 6.5' },
  { value: 'SHOE-US8', label: 'US 8 / UK 7' },
  { value: 'SHOE-US8.5', label: 'US 8.5 / UK 7.5' },
  { value: 'SHOE-US9', label: 'US 9 / UK 8' },
  { value: 'SHOE-US9.5', label: 'US 9.5 / UK 8.5' },
  { value: 'SHOE-US10', label: 'US 10 / UK 9' },
  { value: 'SHOE-US10.5', label: 'US 10.5 / UK 9.5' },
  { value: 'SHOE-US11', label: 'US 11 / UK 10' },
  { value: 'SHOE-US11.5', label: 'US 11.5 / UK 10.5' },
  { value: 'SHOE-US12', label: 'US 12 / UK 11' },
  { value: 'SHOE-US13', label: 'US 13 / UK 12' },

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
