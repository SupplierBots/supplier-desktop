import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { colors, shadows, fonts } from 'themes/main';

interface Props {
  children: ReactNode;
  secondary?: boolean;
  submit?: boolean;
  width?: string;
  onClick?: () => void;
}

const ButtonWrapper = styled.button<Props>`
  background: ${colors.mainGradient45};
  border: none;
  border-radius: 0.5rem;
  height: 3.5rem;
  width: ${({ width }) => width || '13rem'};
  outline: none;
  box-shadow: ${shadows.primary};
  z-index: 1;
  position: relative;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ::before {
    position: absolute;
    content: '';
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(${colors.secondaryBackground}, ${colors.secondaryBackground}),
      ${colors.mainGradient45};
    background-origin: border-box;
    border: double 1px transparent;
    background-clip: padding-box, border-box;
    z-index: -1;
    transition: opacity 0.3s;
    opacity: 0;
    border-radius: 0.5rem;
  }

  :hover::before {
    opacity: 1;
  }

  /* SECONDARY  */
  ${({ secondary }) =>
    secondary &&
    css`
      background-image: linear-gradient(
          ${colors.secondaryBackground},
          ${colors.secondaryBackground}
        ),
        ${colors.mainGradient45};
      background-origin: border-box;
      border: double 1px transparent;
      background-clip: padding-box, border-box;

      ::before {
        background: ${colors.mainGradient45};
        border-radius: 0;
      }
    `}
`;

const ButtonContent = styled.p<Props>`
  font-family: 'Lato', sans-serif;
  font-size: ${fonts.regular};
  color: ${colors.primaryBackground};
  transition: 0.3s all;
  z-index: 10;
  text-align: center;

  ${/* sc-selector */ ButtonWrapper}:hover & {
    color: transparent;
    background: ${colors.mainGradient45};
    /* stylelint-disable-next-line */ /* prefix is necessary: background-clip doesn't work in Chromium */
    -webkit-background-clip: text;
    background-clip: text;
    text-shadow: ${shadows.primary};
  }

  /* SECONDARY  */
  ${({ secondary }) =>
    secondary &&
    css`
      color: transparent;
      background: ${colors.mainGradient45};
      -webkit-background-clip: text;
      text-shadow: ${shadows.primary};

      ${ButtonWrapper}:hover & {
        color: ${colors.primaryBackground};
      }
    `}
`;

const Button = (props: Props) => (
  <ButtonWrapper {...props} type={props.submit ? 'submit' : 'button'}>
    <ButtonContent secondary={props.secondary}>{props.children}</ButtonContent>
  </ButtonWrapper>
);

export default Button;
