import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LoginCard from 'components/LoginCard/LoginCard';
import InlineLogo from 'components/InlineLogo/InlineLogo';
import Input from 'components/Input/Input';
import { Formik, Form, FormikHelpers } from 'formik';
import { fonts, colors } from 'theme/main';
import Button from 'components/Button/Button';
import { signInSchema, signUpSchema, initialValues, Values } from './FormDetails';
import Error from './Error';
import { RouteComponentProps } from 'react-router';
import { loginAttempt, registerAttempt } from 'store/auth/authEpics';
import Spinner from 'components/Spinner/Spinner';
import Fieldset from 'components/Fieldset/Fieldset';
import { useStateDispatch, useStateSelector } from 'hooks/typedReduxHooks';
import { setAuthError } from 'store/auth/authSlice';
import Slider from 'components/Slider/Slider';
import { saveCredentials } from 'store/authPersist/authPersistSlice';

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
  margin: 2rem 0;
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

const StyledError = styled(Error)`
  margin: 2.5rem 0 1rem 0;
  opacity: 1;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  transform: scale(0.8);
`;

const StyledSlider = styled(Slider)`
  margin-top: 0.5rem;
  margin-bottom: 0;
`;

type Props = RouteComponentProps;

const Login = ({ history }: Props) => {
  const [isSignUp, setSignUp] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const dispatch = useStateDispatch();
  const { verifying, error, authenticated } = useStateSelector(state => state.auth);
  const { credentials: savedCredentials, remember } = useStateSelector(state => state.authPersist);

  useEffect(() => {
    if (!remember || attempt > 0) return;
    dispatch(loginAttempt({ credentials: savedCredentials }));
  }, [dispatch, remember, savedCredentials, attempt]);

  const submit = async (values: Values, actions: FormikHelpers<Values>) => {
    setAttempt(attempt + 1);
    if (isSignUp) {
      const credentials = {
        email: values.email,
        password: values.password,
        key: values.key,
      };
      dispatch(registerAttempt({ credentials }));
    } else {
      const credentials = {
        email: values.email,
        password: values.password,
      };
      dispatch(loginAttempt({ credentials }));
      if (!values.remember) return;
      dispatch(saveCredentials({ credentials }));
    }
    actions.setSubmitting(false);
  };

  const getInitialValues = () => {
    if (!remember) return initialValues;
    return {
      ...initialValues,
      email: savedCredentials.email,
      password: savedCredentials.password,
      remember,
    };
  };
  return (
    <Formik
      enableReinitialize
      onSubmit={submit}
      initialValues={getInitialValues()}
      validationSchema={isSignUp ? signUpSchema : signInSchema}
    >
      {({ resetForm, values }) => (
        <Wrapper>
          <LoginCard>
            <StyledInlineLogo>
              <InlineLogo />
            </StyledInlineLogo>
            <Form>
              <Fieldset disabled={verifying}>
                <Input type="text" name="email" placeholder="Email" />
                <Input type="password" name="password" placeholder="Password" />
                {!isSignUp && (
                  <StyledSlider name="remember" checked={values.remember}>
                    Remember
                  </StyledSlider>
                )}
                {isSignUp && (
                  <>
                    <Input type="password" name="passwordConfirm" placeholder="Confirm Password" />
                    <Input type="text" name="key" placeholder="License Key" />
                  </>
                )}
              </Fieldset>

              {verifying || authenticated ? (
                <SpinnerWrapper>
                  <Spinner bgColor={colors.secondaryBackground} />
                </SpinnerWrapper>
              ) : (
                <>
                  {error && <StyledError>{error || 'No error'}</StyledError>}
                  <Contact>
                    <p>Do you have any questions?</p>
                    <Email>
                      Contact us: <GradientText>contact@supplierbot.io</GradientText>
                    </Email>
                  </Contact>
                  <StyledButton
                    small
                    secondary
                    bgColor={colors.secondaryBackground}
                    onClick={() => {
                      setSignUp(!isSignUp);
                      dispatch(setAuthError({ error: '' }));
                      resetForm();
                    }}
                  >
                    {isSignUp ? 'Go Back' : 'Create Account'}
                  </StyledButton>
                  <Button small submit bgColor={colors.secondaryBackground}>
                    {isSignUp ? 'Create' : 'Login'}
                  </Button>
                </>
              )}
            </Form>
          </LoginCard>
        </Wrapper>
      )}
    </Formik>
  );
};

export default Login;
