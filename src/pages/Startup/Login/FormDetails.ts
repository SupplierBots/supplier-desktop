import * as Yup from 'yup';

export interface Values {
  email: string;
  password: string;
  remember: boolean;
  passwordConfirm: string;
  key: string;
}

export const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Incorrect format')
    .required('Required'),
  remember: Yup.boolean(),
  password: Yup.string()
    .min(6, 'Minimum 6 Characters')
    .required('Required'),
});

export const signUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Incorrect format')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Minimum 6 Characters')
    .required('Required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
  key: Yup.string()
    .required('Required')
    .min(8, 'Incorrect format'),
});

export const initialValues = {
  email: '',
  password: '',
  remember: false,
  passwordConfirm: '',
  key: '',
};
