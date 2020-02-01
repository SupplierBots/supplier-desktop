import { Option } from './../../types/Option';
import * as Yup from 'yup';
import { Proxy } from 'types/Proxy';

export const proxyValidationSchema = Yup.object().shape({
  ipPort: Yup.string()
    .required('Required')
    .matches(/.*:.*/, 'Incorrect format'),
  userPassAuth: Yup.boolean(),
  username: Yup.string().when('userPassAuth', {
    is: true,
    then: Yup.string().required('Required'),
    otherwise: Yup.string(),
  }),
  password: Yup.string().when('userPassAuth', {
    is: true,
    then: Yup.string().required('Required'),
    otherwise: Yup.string(),
  }),
  name: Yup.string().required('Required'),
  site: Yup.object().required(),
});

export const initialProxyValues: Proxy = {
  id: '',
  ipPort: '',
  userPassAuth: false,
  username: '',
  password: '',
  name: '',
  site: null,
};

export const siteOptions: Option[] = [
  { value: 'supreme', label: 'Supreme' },
  { value: 'palace', label: 'Palace' },
  { value: 'both', label: 'Both' },
];
