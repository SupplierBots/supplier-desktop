import * as Yup from 'yup';
import { Option } from 'types/Option';
import { Task } from '../../types/Task';

//Works, right?
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
  checkoutDelay: Yup.number().when('site', {
    is: (site: Option) => site?.value === 'supreme',
    then: Yup.number()
      .required('Required')
      .moreThan(750, '> 750ms')
      .lessThan(10000, '< 10000ms'),
    otherwise: Yup.number(),
  }),
  products: Yup.array().min(1),
  stopIfSoldOut: Yup.boolean(),
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
  browser: Yup.object().required(),
});

export const initialTaskValues: Task = {
  id: '',
  site: null,
  profile: null,
  proxy: null,
  browser: null,
  products: [],
  refreshRate: '',
  checkoutDelay: '',
  stopIfSoldOut: false,
  schedule: false,
  scheduledDate: '',
  scheduledTime: '',
  name: '',
};

export const taskSiteOptions: Option[] = [
  { value: 'supreme', label: 'Supreme' },
  { value: 'palace', label: 'Palace' },
];
