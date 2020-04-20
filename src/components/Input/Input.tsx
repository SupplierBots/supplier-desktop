import React, { ChangeEvent } from 'react';
import styled, { css } from 'styled-components';
import { Field, ErrorMessage } from 'formik';
import { colors, fonts } from 'theme/main';
import InputMask from 'react-input-mask';

const Wrapper = styled.div<Props>`
  height: 3.7rem;
  position: relative;
  overflow: hidden;
  margin-bottom: 1rem;
  width: ${({ width }) => width || '100%'};
`;

const InputBorder = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 0.5rem;
  border: double 1px transparent;
  background: ${colors.tertiaryBackground};
`;

const styledInput = css`
  font-family: 'Lato', sans-serif;
  font-size: ${fonts.regular};
  color: ${colors.lightGrey};
  outline: none;
  position: absolute;
  height: 100%;
  width: 100%;
  border: none;
  z-index: 30;
  padding: 0 1.8rem;
  background: none;

  :focus ~ ${InputBorder} {
    background-image: linear-gradient(${colors.tertiaryBackground}, ${colors.tertiaryBackground}),
      ${colors.mainGradient45};
    background-origin: border-box;
    background-clip: padding-box, border-box;
  }

  ::placeholder {
    color: ${colors.darkGrey};
  }

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }
`;

const StyledField = styled(Field)<{ 'data-centered'?: boolean }>`
  ${styledInput}
  ${({ 'data-centered': centered }) => centered && 'text-align: center;'}
`;

const StyledMask = styled(InputMask)`
  ${styledInput}
`;

const Error = styled.div`
  font-size: ${fonts.small};
  color: #d20000;
  background: ${colors.tertiaryBackground};
  pointer-events: none;
  position: absolute;
  right: 1.8rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 35;
  padding: 0.4rem 0.8rem 0.4rem 3rem;

  /* first-of-type used to increase specificity*/
  ${Wrapper} &:first-of-type ~ ${InputBorder} {
    background-image: linear-gradient(${colors.tertiaryBackground}, ${colors.tertiaryBackground}),
      ${colors.redDanger};
    background-origin: border-box;
    background-clip: padding-box, border-box;
  }
`;

const Empty = styled.div`
  display: none;

  /* first-of-type used to increase specificity*/
  ${Wrapper} &:first-of-type ~ ${InputBorder} {
    background-image: linear-gradient(${colors.tertiaryBackground}, ${colors.tertiaryBackground}),
      ${colors.redDanger};
    background-origin: border-box;
    background-clip: padding-box, border-box;
  }
`;

interface Props {
  name: string;
  type: string;
  placeholder: string;
  custom?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  customError?: string;
  width?: string;
  step?: string;
  masked?: boolean;
  mask?: string | (string | RegExp)[];
  maskPlaceholder?: string;
  hideErrors?: boolean;
  'data-centered'?: boolean;
  maxLength?: number;
}

const Input = (props: Props) => {
  const { masked, hideErrors, ...rest } = props;
  return (
    <Wrapper {...rest}>
      {props.masked && props.mask ? (
        <Field {...rest} as={StyledMask} />
      ) : (
        <StyledField
          {...rest}
          autoComplete="off"
          {...(props.custom && { as: 'input', onChange: props.onChange, value: props.value })}
        />
      )}
      <ErrorMessage name={props.name} component={hideErrors ? Empty : Error} />
      {props.customError && <Error>{props.customError}</Error>}
      <InputBorder />
    </Wrapper>
  );
};

export default Input;
