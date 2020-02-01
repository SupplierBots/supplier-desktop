import React, { ReactNode } from 'react';
import styled, { css, Keyframes } from 'styled-components';
import { fonts, colors } from 'theme/main';

interface Props {
  name: string;
  active?: boolean;
  selectable?: boolean;
  children?: ReactNode;
  onClick?: (...args: any[]) => void;
  animation?: Keyframes;
}
const Wrapper = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: ${({ selectable }) => (selectable ? 'space-between' : 'center')};
  border-radius: 0.5rem;
  height: 3.7rem;
  background: ${colors.tertiaryBackground};
  border: 1px solid ${colors.darkGrey};
  padding: 0 1.75rem;
  margin-bottom: 1rem;
  ${({ animation }) =>
    animation &&
    css`
      animation: ${animation} 0.3s forwards;
    `}

  position: relative;
  :hover {
    cursor: pointer;
    background: ${colors.secondaryBackground};
    transition: 0.3s background;
  }

  ${({ active }) =>
    active &&
    css`
      &,
      &:hover {
        cursor: default;
        background: linear-gradient(${colors.tertiaryBackground}, ${colors.tertiaryBackground}),
          ${colors.mainGradient45};
        background-origin: border-box;
        border: double 1px transparent;
        background-clip: padding-box, border-box;
      }
    `}

  ${({ selectable }) =>
    !selectable &&
    css`
      filter: brightness(100%);
      transition: filter 0.3s;
      &:hover {
        cursor: pointer;
        filter: brightness(90%);
      }
    `}
`;

const Name = styled.span<Props>`
  font-size: ${fonts.regular};
  color: ${colors.darkGrey};
  ${({ active }) =>
    active &&
    css`
      color: transparent;
      background: ${colors.mainGradient45};
      -webkit-background-clip: text;
    `}
`;

const Item = (props: Props) => (
  <Wrapper {...props}>
    <Name {...props}>{props.name}</Name>
    {props.children}
  </Wrapper>
);

export default Item;
