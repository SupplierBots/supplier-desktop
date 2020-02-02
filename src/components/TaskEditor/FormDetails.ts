import { DetailedUserData } from './../../types/DetailedUsedData';
import * as Yup from 'yup';
import { Product } from 'types/Product';
import { Option } from 'types/Option';

const dateRegex = /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

const timeRegex = /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/;

export const taskValidationSchema = Yup.object().shape({
  id: Yup.string(),
  profile: Yup.object().required(),
  proxy: Yup.object().required(),
  refreshRate: Yup.number()
    .required('Required')
    .moreThan(750, '> 750ms')
    .lessThan(10000, '< 10000ms'),
  checkoutDelay: Yup.number()
    .required('Required')
    .moreThan(750, '> 750ms')
    .lessThan(10000, '< 10000ms'),
  products: Yup.array().min(1),
  schedule: Yup.boolean(),
  scheduledDate: Yup.string().when('schedule', {
    is: true,
    then: Yup.string()
      .required('!')
      .matches(dateRegex, '!'),
    otherwise: Yup.string(),
  }),
  scheduledTime: Yup.string().when('schedule', {
    is: true,
    then: Yup.string()
      .required('!')
      .matches(timeRegex, '!'),
    otherwise: Yup.string(),
  }),
  name: Yup.string().required('Required'),
  site: Yup.object().required(),
});

export interface Task extends DetailedUserData {
  site: Option | null;
  profile: Option | null;
  proxy: Option | null;
  products: Product[];
  refreshRate: number | string;
  checkoutDelay: number | string;
  schedule: boolean;
  scheduledDate: string;
  scheduledTime: string;
}

export const initialTaskValues: Task = {
  id: '',
  site: null,
  profile: null,
  proxy: null,
  products: [],
  refreshRate: '',
  checkoutDelay: '',
  schedule: false,
  scheduledDate: '',
  scheduledTime: '',
  name: '',
};

export const proxySiteOptions: Option[] = [
  { value: 'supreme', label: 'Supreme' },
  { value: 'palace', label: 'Palace' },
];
