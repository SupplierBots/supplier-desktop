import React from 'react';
import Heading from 'components/Heading/Heading';
import Card from 'components/Card/Card';
import Input from 'components/Input/Input';
import { Formik, FormikProps, Form, FormikActions } from 'formik';
import Select from 'components/Select/Select';
import styled from 'styled-components';
import Button from 'components/Button/Button';
import {
  Profile,
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

const ButtonsContainer = styled.div`
  align-self: end;
  grid-column: 1/3;
  display: flex;
  justify-content: flex-end;
  button:not(:first-of-type) {
    margin-left: 1.5rem;
  }
  button:first-of-type {
    justify-self: flex-start;
    margin-right: auto;
  }
`;

const Profiles = () => {
  const submit = (values: Profile, actions: FormikActions<Profile>) => {
    console.log({ values, actions });
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={profileValidationSchema}
      onSubmit={submit}
      render={(props: FormikProps<Profile>) => (
        <StyledForm>
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
              <Input type="text" name="creditCardNumber" placeholder="Credit Card Number" />
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
              <Input type="text" name="profileName" placeholder="Profile Name" />
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
              <Button secondary>Change Profile</Button>
              <Button secondary submit>
                Save As New
              </Button>
              <Button submit>Save Profile</Button>
            </ButtonsContainer>
          </Wrapper>
        </StyledForm>
      )}
    />
  );
};

export default Profiles;
