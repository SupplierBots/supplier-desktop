import React from 'react';
import Heading from 'components/Heading/Heading';
import Card from 'components/Card/Card';
import Input from 'components/Input/Input';
import { Formik, FormikProps, Form, FormikActions } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  test: Yup.string()
    .min(2, 'Too Short!')
    .max(35, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Incorrect format!')
    .required('Required!'),
  address: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
});

interface Values {
  test: string;
}

const Profiles = () => {
  const submit = (values: Values, actions: FormikActions<Values>) => {
    console.log({ values, actions });
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  };
  return (
    <Formik
      initialValues={{ test: '' }}
      validationSchema={SignupSchema}
      onSubmit={submit}
      render={(props: FormikProps<Values>) => (
        <Form>
          <Card>
            <Heading>Billing detials</Heading>
            <Input type="text" name="test" placeholder="Test input" />
            <Input type="text" name="email" placeholder="Second input" />
            <Input type="text" name="address" placeholder="address input" />
            <Input type="text" name="city" placeholder="city input" />
          </Card>
          <button disabled={!props.isValid} type="submit">
            Suddbmit
          </button>
          <button onClick={() => (props.values.test = 'XD')}>Add as new</button>
        </Form>
      )}
    />
  );
};

export default Profiles;
