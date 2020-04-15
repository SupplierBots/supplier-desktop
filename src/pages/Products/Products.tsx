import React, { useState, useEffect, KeyboardEvent } from 'react';
import { Formik, Form, FormikProps, FormikHelpers } from 'formik';
import { RouteComponentProps } from 'react-router';
import { push } from 'connected-react-router';
import styled from 'styled-components';
import uuid from 'uuid/v4';

import ButtonsContainer from 'components/ButtonsContainer/ButtonsContainer';
import Button from 'components/Button/Button';
import Heading from 'components/Heading/Heading';
import Card from 'components/Card/Card';
import KeywordsManager from 'components/KeywordsManager/KeywordsManager';
import Backdrop from 'components/Backdrop/Backdrop';
import ChangeItemModal from 'components/ChangeItemModal/ChangeItemModal';
import Slider from 'components/Slider/Slider';
import Select from 'components/Select/Select';
import Input from 'components/Input/Input';

import { Product } from 'main/types/Product';
import routes from 'constants/routes';
import {
  initialProductsValues,
  productValidationSchema,
  sizeOptions,
  anySizeOptions,
  productSiteOptions,
} from './FormDetails';

import { addProduct, updateProduct } from 'store/products/productsSlice';
import { setLastVisitedProduct } from 'store/lastVisited/lastVisitedSlice';
import { useStateDispatch, useStateSelector } from 'hooks/typedReduxHooks';
import { incrementCreatedProducts } from 'store/statistics/statisticsSlice';

const Wrapper = styled.div`
  display: grid;
  grid-column-gap: 3rem;
  height: 100%;
`;

const StyledForm = styled(Form)`
  height: 100%;
`;

const SlidersContainer = styled.div`
  display: flex;
`;

const StyledSlider = styled(Slider)`
  :first-child {
    margin-right: 7rem;
  }
`;

const StyledHeading = styled(Heading)`
  margin-top: 2rem;
`;

const Products = ({ history, match }: RouteComponentProps<{ id: string }>) => {
  const [isNew, setIsNew] = useState(!match.params.id);
  const [modalIsOpened, setModalIsOpened] = useState(false);
  const dispatch = useStateDispatch();
  const products = useStateSelector(state => state.products);

  useEffect(() => {
    setModalIsOpened(false);
  }, [match.params.id]);

  const getInitialValues = (): Product => {
    if (!match.params.id) {
      return initialProductsValues;
    }
    const productToLoad = products.find(product => product.id === match.params.id);

    if (productToLoad) {
      dispatch(setLastVisitedProduct({ id: productToLoad.id }));
      return productToLoad;
    }

    return initialProductsValues;
  };

  const handleSubmit = (product: Product, actions: FormikHelpers<Product>) => {
    if (isNew) {
      const newProduct = {
        ...product,
        id: uuid(),
      };
      dispatch(addProduct({ item: newProduct }));
      dispatch(incrementCreatedProducts());
      setIsNew(false);
      dispatch(push(routes.products + '/' + newProduct.id));
    } else {
      dispatch(updateProduct({ item: product }));
    }
    actions.setSubmitting(false);
  };

  const disableEnter = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };
  return (
    <>
      {modalIsOpened && (
        <Backdrop
          visible={modalIsOpened && products.length > 0}
          onClick={() => setModalIsOpened(false)}
        >
          <ChangeItemModal
            modalTitle="Select Product"
            type="products"
            close={() => setModalIsOpened(false)}
            active={match.params.id}
          />
        </Backdrop>
      )}

      <Formik
        enableReinitialize
        initialValues={getInitialValues()}
        validationSchema={productValidationSchema}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<Product>) => (
          <StyledForm onKeyPress={disableEnter}>
            <Wrapper>
              <Card>
                <Heading>Product details</Heading>
                <KeywordsManager
                  name="keywords"
                  placeholder="+Another keyword"
                  hasMulti
                  onChange={props.setFieldValue}
                  setTouched={props.setFieldTouched}
                  error={!!props.errors.keywords && !!props.touched.keywords}
                  description="Press enter or click 'Add'"
                  values={props.values.keywords}
                />
                <KeywordsManager
                  name="colors"
                  placeholder="+Another color"
                  onChange={props.setFieldValue}
                  setTouched={props.setFieldTouched}
                  error={!!props.errors.colors && !!props.touched.colors}
                  description="Press enter or click 'Add'"
                  values={props.values.colors}
                  customStyle={`
                  margin-bottom: .7rem;
                `}
                />
              </Card>
              <Card>
                <Heading>Additional details</Heading>
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
                  <StyledSlider name="anySize" checked={props.values.anySize}>
                    Any Size
                  </StyledSlider>
                  <StyledSlider name="anyColor" checked={props.values.anyColor}>
                    Any Color
                  </StyledSlider>
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
                <Input type="text" name="name" placeholder="Product Name" />
                <Select
                  name="site"
                  placeholder="Site"
                  value={props.values.site}
                  options={productSiteOptions}
                  onBlur={props.setFieldTouched}
                  onChange={props.setFieldValue}
                  error={!!props.errors.site && !!props.touched.site}
                />
              </Card>
              <ButtonsContainer>
                {products.length > 0 && (
                  <Button
                    secondary
                    disabled={props.dirty && !isNew}
                    onClick={() => setModalIsOpened(true)}
                  >
                    Select Product
                  </Button>
                )}
                {!isNew && !props.dirty && (
                  <Button secondary onClick={() => history.push(routes.products)}>
                    Create new
                  </Button>
                )}
                {!isNew && props.dirty && (
                  <Button
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
                  {isNew ? 'Add Product' : 'Save Changes'}
                </Button>
              </ButtonsContainer>
            </Wrapper>
          </StyledForm>
        )}
      </Formik>
    </>
  );
};

export default Products;
