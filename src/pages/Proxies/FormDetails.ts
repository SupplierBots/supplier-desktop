import { Option } from 'main/types/Option';
import * as Yup from 'yup';
import { Proxy } from 'main/types/Proxy';

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
  region: Yup.object().required(),
  name: Yup.string(),
});

export const initialProxyValues: Proxy = {
  id: '',
  ipPort: '',
  userPassAuth: false,
  username: '',
  password: '',
  region: null,
  name: '',
};

export const siteOptions: Option[] = [
  { value: 'supreme', label: 'Supreme' },
  { value: 'palace', label: 'Palace' },
  { value: 'both', label: 'Both' },
];

export const proxyRegions: Option[] = [
  { value: 'eu', label: 'Europe' },
  { value: 'us', label: 'USA' },
];
