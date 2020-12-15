import * as Yup from 'yup';
import { Option } from 'main/types/Option';
import { Task } from 'main/types/Task';
import { TaskStatusType } from 'main/types/TaskStatus';

export const taskValidationSchema = Yup.object().shape({
  id: Yup.string(),
  profile: Yup.object().required(),
  refreshRate: Yup.number()
    .required('Required')
    .moreThan(250, '> 250ms')
    .lessThan(10000, '< 10000ms'),
  checkoutDelay: Yup.number().when('site', {
    is: (site: Option) => site?.value === 'supreme',
    then: Yup.number()
      .required('Required')
      .lessThan(10000, '< 10000ms'),
    otherwise: Yup.number(),
  }),
  products: Yup.array().min(1),
  stopIfSoldOut: Yup.boolean(),
  bypassCardinal: Yup.boolean(),
  name: Yup.string().required('Required'),
  site: Yup.object().required(),
});

export const initialTaskValues: Task = {
  isActive: false,
  id: '',
  site: null,
  profile: null,
  products: [],
  status: {
    message: 'Inactive',
    type: TaskStatusType.Inactive,
  },
  refreshRate: '',
  checkoutDelay: '',
  bypassCardinal: false,
  stopIfSoldOut: false,
  name: '',
};

export const taskSiteOptions: Option[] = [{ value: 'supreme', label: 'Supreme Hybrid' }];
