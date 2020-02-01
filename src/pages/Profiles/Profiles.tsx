import React, { useState, useEffect } from 'react';
import { Formik, Form, FormikProps, FormikHelpers } from 'formik';
import { RouteComponentProps } from 'react-router';
import { push } from 'connected-react-router';
import styled from 'styled-components';
import uuid from 'uuid/v4';

import { useDispatch } from 'hooks/useDispatch';
import { useSelector } from 'hooks/useSelector';

import ButtonsContainer from 'components/ButtonsContainer/ButtonsContainer';
import Button from 'components/Button/Button';
import Heading from 'components/Heading/Heading';
import Card from 'components/Card/Card';
import Backdrop from 'components/Backdrop/Backdrop';
import ChangeItemModal from 'components/ChangeItemModal/ChangeItemModal';
import Select from 'components/Select/Select';
import Input from 'components/Input/Input';

import { addUserDataItem, updateUserDataItem } from 'store/userData/actions';
import { slideInFromRight } from 'theme/animations';
import { Profile } from 'types/Profile';
import routes from 'constants/routes';
import {
  profileValidationSchema,
  initialValues,
  countryOptions,
  creditCardTypeOptions,
  monthOptions,
  yearOptions,
  siteOptions,
} from './FormDetails';

const Wrapper = styled.div`
  display: grid;
  grid-column-gap: 3rem;
  height: 100%;
`;

const CardExpDate = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledHeading = styled(Heading)`
  margin-top: 4.1rem;
`;

const StyledForm = styled(Form)`
  height: 100%;
`;

const Profiles = ({ match, history }: RouteComponentProps<{ id: string }>) => {
  const [isNew, setIsNew] = useState(!match.params.id);
  const [modalIsOpened, setModalIsOpened] = useState(false);
  const dispatch = useDispatch();
  const profiles = useSelector(state => state.userData.profiles);

  useEffect(() => {
    setModalIsOpened(false);
  }, [match.params.id]);

  const getInitialValues = (): Profile => {
    if (!match.params.id) {
      return initialValues;
    }
    const profileToLoad = profiles.find(profile => profile.id === match.params.id);

    if (profileToLoad) return profileToLoad;

    return initialValues;
  };

  const handleSubmit = (product: Profile, actions: FormikHelpers<Profile>) => {
    if (isNew) {
      const newProduct = {
        ...product,
        id: uuid(),
      };
      dispatch(addUserDataItem('profiles', newProduct));
      setIsNew(false);
      dispatch(push(routes.profiles + '/' + newProduct.id));
    } else {
      dispatch(updateUserDataItem('profiles', product));
    }
    actions.setSubmitting(false);
  };

  return (
    <>
      {modalIsOpened && (
        <Backdrop
          visible={modalIsOpened && profiles.length > 0}
          onClick={() => setModalIsOpened(false)}
        >
          <ChangeItemModal
            modalTitle="Select Profile"
            type="profiles"
            close={() => setModalIsOpened(false)}
            active={match.params.id}
          />
        </Backdrop>
      )}

      <Formik
        enableReinitialize
        initialValues={getInitialValues()}
        validationSchema={profileValidationSchema}
        onSubmit={handleSubmit}
        render={(props: FormikProps<Profile>) => (
          <StyledForm autoComplete="new-password">
            <Wrapper>
              <Card>
                <Heading>Billing detials</Heading>
                <Input type="text" name="firstName" placeholder="First Name" />
                <Input type="text" name="lastName" placeholder="Last Name" />
                <Input type="text" name="email" placeholder="Email" />
                <Input type="text" name="telephone" placeholder="Telephone" />
                <Input type="text" name="address1" placeholder="Address 1" />
                <Input type="text" name="address2" placeholder="Address 2" />
                <Input type="text" name="city" placeholder="City" />
                <Input type="text" name="postcode" placeholder="Postcode" />
                <Select
                  name="country"
                  placeholder="Country"
                  value={props.values.country}
                  options={countryOptions}
                  onBlur={props.setFieldTouched}
                  onChange={props.setFieldValue}
                  error={!!props.errors.country && !!props.touched.country}
                />
              </Card>
              <Card>
                <Heading>Payment detials</Heading>
                <Select
                  name="creditCardType"
                  placeholder="Credit Card Type"
                  value={props.values.creditCardType}
                  options={creditCardTypeOptions}
                  onBlur={props.setFieldTouched}
                  onChange={props.setFieldValue}
                  error={!!props.errors.creditCardType && !!props.touched.creditCardType}
                />
                <Input type="number" name="creditCardNumber" placeholder="Credit Card Number" />
                <CardExpDate>
                  <Select
                    name="month"
                    placeholder="Month"
                    value={props.values.month}
                    options={monthOptions}
                    onBlur={props.setFieldTouched}
                    onChange={props.setFieldValue}
                    error={!!props.errors.month && !!props.touched.month}
                    width="48.5%"
                  />

                  <Select
                    name="year"
                    placeholder="Year"
                    value={props.values.year}
                    options={yearOptions}
                    onBlur={props.setFieldTouched}
                    onChange={props.setFieldValue}
                    error={!!props.errors.year && !!props.touched.year}
                    width="48.5%"
                  />
                </CardExpDate>
                <Input type="text" name="cvv" placeholder="CVV" />
                <StyledHeading>Other</StyledHeading>
                <Input type="text" name="name" placeholder="Profile Name" />
                <Select
                  name="site"
                  placeholder="Site"
                  value={props.values.site}
                  options={siteOptions}
                  onBlur={props.setFieldTouched}
                  onChange={props.setFieldValue}
                  error={!!props.errors.site && !!props.touched.site}
                />
              </Card>
              <ButtonsContainer>
                {profiles.length > 0 && (
                  <Button
                    secondary
                    disabled={props.dirty && !isNew}
                    onClick={() => setModalIsOpened(true)}
                  >
                    Select Profile
                  </Button>
                )}
                {!isNew && !props.dirty && (
                  <Button secondary onClick={() => history.push(routes.profiles)}>
                    Create new
                  </Button>
                )}
                {!isNew && props.dirty && (
                  <Button
                    animation={slideInFromRight}
                    secondary
                    onClick={async () => {
                      const errors = await props.validateForm();

                      if (Object.entries(errors).length !== 0) return;
                      setIsNew(true);
                      props.submitForm();
                    }}
                  >
                    Save As New
                  </Button>
                )}
                <Button disabled={!props.dirty && !isNew} submit>
                  {isNew ? 'Add Profile' : 'Save Changes'}
                </Button>
              </ButtonsContainer>
            </Wrapper>
          </StyledForm>
        )}
      />
    </>
  );
};

export default Profiles;
