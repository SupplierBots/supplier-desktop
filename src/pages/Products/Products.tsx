import React, { KeyboardEvent } from 'react';
import styled from 'styled-components';
import { Formik, FormikActions, FormikProps, Form } from 'formik';
import Button from 'components/Button/Button';
import Card from 'components/Card/Card';
import Heading from 'components/Heading/Heading';
import KeywordsManager from 'components/KeywordsManager/KeywordsManager';
import {
  initialProductsValues,
  productValidationSchema,
  Product,
  sizeOptions,
  anySizeOptions,
  productSiteOptions,
} from './FormDetails';
import Select from 'components/Select/Select';
import Slider from 'components/Slider/Slider';
import Input from 'components/Input/Input';

const Wrapper = styled.div`
  display: grid;
  grid-column-gap: 3rem;
  height: 100%;
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

const SlidersContainer = styled.div`
  display: flex;
`;

const StyledHeading = styled(Heading)`
  margin-top: 2rem;
`;

const Products = () => {
  const submit = (values: any, actions: FormikActions<any>) => {
    console.log({ values, actions });
    actions.setSubmitting(false);
  };

  const disableEnter = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };
  return (
    <Formik
      initialValues={initialProductsValues}
      validationSchema={productValidationSchema}
      onSubmit={submit}
      render={(props: FormikProps<Product>) => (
        <StyledForm onKeyPress={disableEnter}>
          <Wrapper>
            <Card>
              <Heading>Product detials</Heading>
              <KeywordsManager
                name="keywords"
                placeholder="Add another keyword"
                hasMulti
                onChange={props.setFieldValue}
                setTouched={props.setFieldTouched}
                error={!!props.errors.keywords && !!props.touched.colors}
                description="Press enter or click 'Add'"
              />
              <KeywordsManager
                name="colors"
                placeholder="Add another color"
                onChange={props.setFieldValue}
                setTouched={props.setFieldTouched}
                error={!!props.errors.colors && !!props.touched.colors}
                description="Press enter or click 'Add'"
                customStyle={`
                  margin-bottom: .7rem;
                `}
              />
            </Card>
            <Card>
              <Heading>Additional detials</Heading>
              <Select
                name="size"
                placeholder="Size"
                value={props.values.size}
                options={sizeOptions}
                onBlur={props.setFieldTouched}
                onChange={props.setFieldValue}
                error={!!props.errors.size && !!props.touched.size}
              />
              <SlidersContainer>
                <Slider name="anySize" label="Any Size" checked={props.values.anySize} />
                <Slider name="anyColor" label="Any Color" checked={props.values.anyColor} />
              </SlidersContainer>
              {props.values.anySize && (
                <Select
                  name="anySizeOption"
                  placeholder="If size not available select"
                  value={props.values.anySizeOption}
                  options={anySizeOptions}
                  onBlur={props.setFieldTouched}
                  onChange={props.setFieldValue}
                  error={!!props.errors.anySizeOption && !!props.touched.anySizeOption}
                />
              )}
              <StyledHeading>Other</StyledHeading>
              <Input type="text" name="productName" placeholder="Product Name" />
              <Select
                name="productSite"
                placeholder="Site"
                value={props.values.productSite}
                options={productSiteOptions}
                onBlur={props.setFieldTouched}
                onChange={props.setFieldValue}
                error={!!props.errors.productSite && !!props.touched.productSite}
              />
            </Card>
            <ButtonsContainer>
              <Button secondary>Change Product</Button>
              <Button secondary submit>
                Save As New
              </Button>
              <Button submit>Save Product</Button>
            </ButtonsContainer>
          </Wrapper>
        </StyledForm>
      )}
    />
  );
};

export default Products;
