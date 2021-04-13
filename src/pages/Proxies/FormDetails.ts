import * as Yup from 'yup';
import { Proxy } from 'main/types/Proxy';

export const proxyValidationSchema = Yup.object().shape({
  ipPort: Yup.string()
    .required('Required')
    .matches(/.*:\d+$/, 'Incorrect format'),
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
  name: Yup.string(),
});

export const initialProxyValues: Proxy = {
  id: '',
  ipPort: '',
  userPassAuth: false,
  username: '',
  password: '',
  name: '',
};
