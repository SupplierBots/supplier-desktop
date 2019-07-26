import React from 'react';
import styled from 'styled-components';
import { Field, ErrorMessage } from 'formik';
import { colors, fonts } from 'themes/main';

const Wrapper = styled.div`
  height: 3.7rem;
  position: relative;
  overflow: hidden;
  :not(:last-of-type) {
    margin-bottom: 1.1rem;
  }
`;

const InputBorder = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 0.5rem;
  border: double 1px transparent;
  background: ${colors.tertiaryBackground};
`;

const StyledField = styled(Field)`
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

interface Props {
  name: string;
  type: string;
  placeholder: string;
}

const Input = (props: Props) => (
  <Wrapper>
    <StyledField {...props} />
    <ErrorMessage name={props.name} component={Error} />
    <InputBorder />
  </Wrapper>
);

export default Input;
