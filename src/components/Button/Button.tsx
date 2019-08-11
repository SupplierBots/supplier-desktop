import React, { ReactNode } from 'react';
import styled, { css, Keyframes } from 'styled-components';
import { colors, shadows, fonts } from 'theme/main';

interface Props {
  children: ReactNode;
  animation?: Keyframes;
  secondary?: boolean;
  disabled?: boolean;
  small?: boolean;
  submit?: boolean;
  width?: string;
  height?: string;
  bgColor?: string;
  onClick?: () => void;
}

const ButtonWrapper = styled.button<Props>`
  background: ${colors.mainGradient45};
  border: none;
  border-radius: 0.5rem;
  height: ${({ small, height }) => (height ? height : small ? '3.5rem' : '4rem')};
  width: ${({ width, small }) => (width ? width : small ? '13rem' : '16rem')};
  outline: none;
  box-shadow: ${shadows.primary};
  z-index: 1;
  position: relative;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: .3s all;
  ${({ animation }) =>
    animation &&
    css`
      animation: ${animation} 0.3s forwards;
    `};

  ::before {
    position: absolute;
    content: '';
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(
        ${({ bgColor }) => bgColor || colors.primaryBackground},
        ${({ bgColor }) => bgColor || colors.primaryBackground}
      ),
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
  ${({ secondary, bgColor }) =>
    secondary &&
    css`
      background: linear-gradient(
          ${bgColor || colors.primaryBackground},
          ${bgColor || colors.primaryBackground}
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

    /* DISABLED  */
  ${({ disabled, bgColor }) =>
    disabled &&
    css`
      transition: none;
      cursor: default;
      pointer-events: none;
      background: ${bgColor || colors.primaryBackground};
      color: ${colors.darkGrey};
      border: 1px solid ${colors.darkGrey};
      ::before {
        display: none;
      }
    `}
`;

const ButtonContent = styled.p<Props>`
  font-family: 'Lato', sans-serif;
  font-size: ${({ small }) => (small ? fonts.regular : fonts.big)};
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
  /* DISABLED  */
  ${({ disabled }) =>
    disabled &&
    css`
      &,
      ${/* sc-selector */ ButtonWrapper}:hover & {
        transition: none;
        color: ${colors.darkGrey};
        text-shadow: ${shadows.primary};
      }
    `}
`;

const Button = (props: Props) => (
  <ButtonWrapper {...props} type={props.submit ? 'submit' : 'button'} tabIndex={-1}>
    <ButtonContent small={props.small} secondary={props.secondary} disabled={props.disabled}>
      {props.children}
    </ButtonContent>
  </ButtonWrapper>
);

export default Button;
