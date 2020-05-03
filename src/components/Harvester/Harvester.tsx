import React, { ReactNode, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { colors, fonts, shadows } from 'theme/main';
import Button from 'components/Button/Button';
import { ReactComponent as RemoveIcon } from 'assets/Remove.svg';
import { HarvesterData } from 'main/types/HarvesterData';
import Input from 'components/Input/Input';
import Select from 'components/Select/Select';
import { Formik, FormikProps, useFormikContext, FormikHelpers } from 'formik';
import { useStateSelector, useStateDispatch } from 'hooks/typedReduxHooks';
import { Proxy } from 'main/types/Proxy';
import { Option } from 'main/types/Option';
import { InlineInputsContainer } from 'components/TaskEditor/TaskEditor';
import { IPCRenderer } from 'main/IPC/IPCRenderer';
import { removeBrowser } from 'store/harvesters/harvestersSlice';
import * as Yup from 'yup';
import { setProxy } from 'store/harvesters/harvestersSlice';

interface Props {
  data: HarvesterData;
}

const Wrapper = styled.div`
  height: 12rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0 1.3rem 0;
  margin-top: 1rem;

  :not(:last-of-type) {
    border-bottom: 1px solid ${colors.tertiaryBackground};
  }

  :last-of-type {
    border-bottom: 1px solid transparent;
  }
`;

const StyledRemoveIcon = styled(RemoveIcon)<{ 'data-removable'?: boolean }>`
  width: 1.6rem;
  transition: all 0.3s;
  align-self: flex-start;
  path {
    fill: ${({ 'data-removable': canBeRemoved }) =>
      canBeRemoved ? 'url(#iconGradient)' : colors.darkGrey};
  }

  ${({ 'data-removable': canBeRemoved }) =>
    canBeRemoved &&
    css`
      :hover {
        color: ${colors.lightGrey};
        cursor: pointer;
        transform: scale(1.1);
        path {
          fill: ${colors.lightGrey};
        }
      }
    `}
`;

const Name = styled.p`
  font-size: ${fonts.regular};
  color: ${colors.lightGrey};
  margin-right: auto;
  margin-top: 0.5rem;
`;

const HarvesterBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const InputsContainer = styled(InlineInputsContainer)`
  margin-top: auto;
`;

const InlineElements = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface HarvesterProxy {
  proxy: Option;
}

const validationSchema = Yup.object().shape({
  proxy: Yup.object().required(),
});

const Harvester = ({ data }: Props) => {
  const dispatch = useStateDispatch();
  const proxies = useStateSelector(state => state.proxies);

  const getOptions = () => {
    const options = proxies.map(p => ({ label: p.name, value: p.id }));
    options.unshift({ label: 'Proxy - None', value: 'none' });
    return options;
  };

  const SubmitOnExit = () => {
    const { values, submitForm } = useFormikContext();
    useEffect(() => {
      return () => {
        submitForm();
      };
    }, [values, submitForm]);
    return null;
  };

  const handleSubmit = ({ proxy }: HarvesterProxy, actions: FormikHelpers<HarvesterProxy>) => {
    dispatch(setProxy({ id: data.id, proxy }));
  };

  return (
    <Wrapper>
      <Formik
        enableReinitialize
        initialValues={{ proxy: data.proxy }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          setFieldTouched,
          setFieldValue,
          errors,
          touched,
        }: FormikProps<HarvesterProxy>) => (
          <HarvesterBody>
            <SubmitOnExit />
            <InlineElements>
              <Name>{data.accountEmail}</Name>
              {!data.isActive ? (
                <StyledRemoveIcon
                  data-removable
                  onClick={() => dispatch(removeBrowser({ id: data.id }))}
                />
              ) : (
                <StyledRemoveIcon />
              )}
            </InlineElements>
            <InputsContainer>
              <Select
                name="proxy"
                placeholder="Proxy"
                value={values.proxy}
                options={getOptions()}
                onBlur={setFieldTouched}
                onChange={setFieldValue}
                error={!!errors.proxy && !!touched.proxy}
                width="65%"
              />

              <Button
                secondary
                small
                disabled={data.isActive}
                bgColor={colors.tertiaryBackground}
                onClick={() => IPCRenderer.setupHarvester(data)}
                width="30%"
              >
                {data.isActive ? 'Active' : data.isLogged ? 'Relogin' : 'Login'}
              </Button>
            </InputsContainer>
          </HarvesterBody>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Harvester;
