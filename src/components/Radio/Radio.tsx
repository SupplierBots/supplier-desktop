import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme/main';

const HiddenRadio = styled.input`
  display: none;
`;

const StyledRadio = styled.div<{ 'data-checked': boolean }>`
  color: ${colors.darkGrey};
  ${({ 'data-checked': checked }) =>
    checked &&
    css`
      color: transparent;
      background: ${colors.mainGradient45};
      -webkit-background-clip: text;
    `}
`;

const Wrapper = styled.div<{ 'data-checked': boolean }>`
  height: 3.7rem;
  background-color: ${colors.tertiaryBackground};
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: ${fonts.medium};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  color: ${colors.darkGrey};
  border: 1px solid ${colors.darkGrey};

  :not(:first-of-type) {
    margin-left: 0.7rem;
  }

  ${({ 'data-checked': checked }) =>
    checked &&
    css`
      background: linear-gradient(
          ${colors.tertiaryBackground},
          ${colors.tertiaryBackground}
        ),
        ${colors.mainGradient45};

      background-origin: border-box;
      border: double 1px transparent;
      background-clip: padding-box, border-box;

      ::before {
        background: ${colors.mainGradient45};
        border-radius: 0;
    `}
`;

interface Props {
  children: ReactNode;
  name: string;
  value: string;
  currentValue: string;
  onChange: (name: string, value: string) => void;
}

const Radio = (props: Props) => {
  const { children, onChange, ...rest } = props;

  const isSelected = () => props.currentValue === props.value;

  return (
    <Wrapper data-checked={isSelected()} onClick={() => onChange(props.name, props.value)}>
      <HiddenRadio type="radio" defaultChecked={isSelected()} {...rest} />
      <StyledRadio data-checked={isSelected()} {...rest}>
        {props.children}
      </StyledRadio>
    </Wrapper>
  );
};

export default Radio;
