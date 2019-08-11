import React, { useState } from 'react';
import styled from 'styled-components';
import LoginCard from 'components/LoginCard/LoginCard';
import InlineLogo from 'components/InlineLogo/InlineLogo';
import Input from 'components/Input/Input';
import { Formik, Form, FormikActions } from 'formik';
import { fonts, colors } from 'theme/main';
import Button from 'components/Button/Button';
import { signInSchema, signUpSchema, initialValues, Values } from './FormDetails';
import Error from './Error';
import { RouteComponentProps } from 'react-router';
import routes from 'constants/routes';
import { useDispatch } from 'hooks/useDispatch';
import { changeAuthState } from 'store/auth/actions';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 4rem;
  z-index: 10;
  -webkit-app-region: drag;
`;

const StyledInlineLogo = styled.div`
  transform: scale(0.72);
  margin-top: 2.5rem;
  margin-bottom: 3.5rem;
`;

const Contact = styled.div`
  font-size: ${fonts.regular};
  margin-bottom: 2rem;
`;

const Email = styled.p`
  color: ${colors.darkGrey};
`;

const GradientText = styled.span`
  color: transparent;
  background: ${colors.mainGradientLR};
  /* stylelint-disable-next-line */ /* prefix is necessary: background-clip doesn't work in Chromium */
  -webkit-background-clip: text;
  background-clip: text;
`;

const StyledButton = styled(Button)`
  margin-right: 1rem;
  width: 18rem;
`;

type Props = RouteComponentProps;

const Login = ({ history }: Props) => {
  const [isSignUp, setSignUp] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const submit = (values: Values, actions: FormikActions<Values>) => {
    actions.setSubmitting(false);
    console.log({ values, actions });
    setError("Couldn't connect to the server");
    dispatch(changeAuthState(true));
    history.push(routes.dashboard);
  };
  return (
    <Formik
      enableReinitialize
      onSubmit={submit}
      initialValues={initialValues}
      validationSchema={isSignUp ? signUpSchema : signInSchema}
      render={({ resetForm }) => (
        <Wrapper>
          <LoginCard>
            <StyledInlineLogo>
              <InlineLogo />
            </StyledInlineLogo>
            <Form>
              <Input type="text " name="email" placeholder="Email" />
              <Input type="password" name="password" placeholder="Password" />
              {isSignUp && (
                <>
                  <Input type="password" name="passwordConfirm" placeholder="Confirm Password" />
                  <Input type="text" name="key" placeholder="License Key" />
                </>
              )}
              <Error visible={error !== ''}>{error || 'No error'}</Error>
              <Contact>
                <p>Do you have any problems?</p>
                <Email>
                  Contact us: <GradientText>support@safedropbot.com</GradientText>
                </Email>
              </Contact>
              <StyledButton
                small
                secondary
                bgColor={colors.secondaryBackground}
                onClick={() => {
                  setSignUp(!isSignUp);
                  setError('');
                  resetForm();
                }}
              >
                {isSignUp ? 'Go Back' : 'Create Account'}
              </StyledButton>
              <Button small submit bgColor={colors.secondaryBackground}>
                {isSignUp ? 'Create' : 'Login'}
              </Button>
            </Form>
          </LoginCard>
        </Wrapper>
      )}
    />
  );
};

export default Login;
