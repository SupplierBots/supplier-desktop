import React, { useState } from 'react';
import { Formik, Form, FormikProps, FormikHelpers } from 'formik';
import { RouteComponentProps } from 'react-router';
import { push } from 'connected-react-router';
import styled from 'styled-components';
import uuid from 'uuid/v4';

import ButtonsContainer from 'components/ButtonsContainer/ButtonsContainer';
import Button from 'components/Button/Button';
import Heading from 'components/Heading/Heading';
import Card from 'components/Card/Card';
import Input from 'components/Input/Input';

import routes from 'constants/routes';
import { proxyValidationSchema, initialProxyValues } from './FormDetails';
import Slider from 'components/Slider/Slider';
import { Proxy } from 'main/types/Proxy';
import Item from 'components/ChangeItemModal/SelectableItem';
import { colors, fonts } from 'theme/main';
import { setLastVisitedProxy } from 'store/lastVisited/lastVisitedSlice';
import { addProxy, updateProxy } from 'store/proxies/proxiesSlice';
import { useStateDispatch, useStateSelector } from 'hooks/typedReduxHooks';
import _ from 'lodash';

const Wrapper = styled.div`
  display: grid;
  grid-column-gap: 3rem;
  height: 100%;
`;

const StyledHeading = styled(Heading)`
  margin-top: 2rem;
`;

const StyledForm = styled(Form)`
  height: 100%;
`;

const EmptyList = styled.div`
  padding: 6rem 0;
  font: inherit;
  text-align: center;
  font-size: ${fonts.regular};
  color: ${colors.darkGrey};
`;

const ProxiesList = styled.div<{ scrollEnabled?: boolean }>`
  overflow-y: auto;
  max-height: 45rem;
  padding-right: ${({ scrollEnabled }) => (scrollEnabled ? '2rem' : '0')};

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 0.3rem;
    border-radius: 2rem;
    overflow: hidden;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.mainGradientTB};
    border-radius: 2rem;
  }
`;

const StyledButton = styled(Button)`
  &[type='button']:first-of-type:not(:only-child) {
    justify-self: flex-end;
    margin-right: 0;
  }
`;

const Proxies = ({ match, history }: RouteComponentProps<{ id: string }>) => {
  const [isNew, setIsNew] = useState(!match.params.id);
  const dispatch = useStateDispatch();
  const proxies = useStateSelector(state => state.proxies);

  const getInitialValues = (): Proxy => {
    if (!match.params.id) {
      return initialProxyValues;
    }
    const proxyToLoad = proxies.find(proxy => proxy.id === match.params.id);

    if (proxyToLoad) {
      dispatch(setLastVisitedProxy({ id: proxyToLoad.id }));
      return proxyToLoad;
    }

    return initialProxyValues;
  };

  const handleSubmit = (proxy: Proxy, actions: FormikHelpers<Proxy>) => {
    if (!proxy.name) proxy.name = _.take(proxy.ipPort, 24).join('');
    if (isNew) {
      const newProxy = {
        ...proxy,
        id: uuid(),
      };
      dispatch(addProxy({ item: newProxy }));
      setIsNew(false);
      dispatch(push(routes.proxies + '/' + newProxy.id));
    } else {
      dispatch(updateProxy({ item: proxy }));
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={getInitialValues()}
      validationSchema={proxyValidationSchema}
      onSubmit={handleSubmit}
    >
      {(props: FormikProps<Proxy>) => (
        <StyledForm>
          <Wrapper>
            <Card>
              <Heading>Proxy details</Heading>
              <Input type="text" name="ipPort" placeholder="IP:Port" />
              <Slider name="userPassAuth" checked={props.values.userPassAuth}>
                User:Pass Authentication
              </Slider>
              {props.values.userPassAuth && (
                <>
                  <Input type="text" name="username" placeholder="Username" />
                  <Input type="text" name="password" placeholder="Password" />
                </>
              )}
              <StyledHeading>Other</StyledHeading>
              <Input type="text" name="name" placeholder="Proxy Name (optional)" />
            </Card>
            <Card>
              <Heading>Select proxy</Heading>
              {proxies.length > 0 ? (
                <ProxiesList scrollEnabled={proxies.length > 9}>
                  {proxies.map(item => (
                    <Item
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      type="proxies"
                      active={item.id === match.params.id}
                    />
                  ))}
                </ProxiesList>
              ) : (
                <EmptyList>No proxies</EmptyList>
              )}
            </Card>
            <ButtonsContainer>
              {!isNew && !props.dirty && (
                <StyledButton secondary onClick={() => history.push(routes.proxies)}>
                  Create new
                </StyledButton>
              )}
              {!isNew && props.dirty && (
                <StyledButton
                  secondary
                  onClick={async () => {
                    const errors = await props.validateForm();

                    if (Object.entries(errors).length !== 0) return;
                    setIsNew(true);
                    props.submitForm();
                  }}
                >
                  Save As New
                </StyledButton>
              )}
              <Button disabled={!props.dirty && !isNew} submit>
                {isNew ? 'Add Proxy' : 'Save Changes'}
              </Button>
            </ButtonsContainer>
          </Wrapper>
        </StyledForm>
      )}
    </Formik>
  );
};

export default Proxies;
