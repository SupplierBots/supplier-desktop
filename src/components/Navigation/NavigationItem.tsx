import React, { ReactNode, MouseEvent } from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { colors, fonts } from 'theme/main';
import { shell } from 'electron';

//Unfortunately kind of tricky way to style it:
//svgs with gradients, react-router and styled-components don't like each other

interface Props {
  children: ReactNode;
  link: string;
  name: string;
  alwaysActive?: boolean;
  external?: boolean;
  disabled?: boolean;
  click?: (url: string) => void;
}

const StyledNavLink = styled(NavLink)<{ disabled?: boolean; 'data-active'?: boolean }>`
  color: ${colors.darkGrey};
  font-size: ${fonts.big};
  height: 5rem;
  display: flex;
  align-items: center;
  transition: all 0.3s;
  cursor: pointer;
  outline: none;

  svg {
    margin: 0 2.5rem 0rem 2.5rem;

    path {
      transition: all 0.3s;
      fill: ${colors.darkGrey};
    }
  }

  div {
    align-self: stretch;
    width: 0.5rem;
  }

  &.active,
  &:hover {
    color: ${colors.lightPurple};
    path {
      fill: ${colors.lightPurple};
    }
  }

  &.active {
    background: ${colors.tertiaryBackground};
    div {
      background: ${colors.mainGradientTB};
    }
    path {
      fill: url(#iconGradient);
    }
  }

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      opacity: 0.3;
      :hover {
        cursor: not-allowed;
      }
    `};

  ${({ 'data-active': alwaysActive }) =>
    alwaysActive &&
    css`
      svg path {
        fill: url(#iconGradient);
      }
      :hover path {
        fill: ${colors.lightPurple};
      }
    `};
`;

const NavigationName = styled.span`
  margin-top: 0.2rem;
`;

const NavigationItem = ({ link, children, external, disabled, name, alwaysActive }: Props) => {
  const additionalProps = external && {
    onClick: (e: MouseEvent) => {
      e.preventDefault();
      shell.openExternal('https://safedropbot.com/');
    },
  };

  return (
    <StyledNavLink to={link} {...additionalProps} disabled={disabled} data-active={alwaysActive}>
      <div />
      {children}
      <NavigationName>{name}</NavigationName>
    </StyledNavLink>
  );
};
export default NavigationItem;
