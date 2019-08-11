import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { colors, fonts } from 'theme/main';
import nw from 'NW';

//Unfortunately kind of tricky way to style it:
//svgs with gradients, react-router and styled-components don't like each other

const StyledNavLink = styled(NavLink)`
  color: ${colors.darkGrey};
  font-size: ${fonts.big};
  height: 5rem;
  display: flex;
  align-items: center;
  transition: all 0.3s;
  cursor: pointer;

  svg {
    margin: 0 2.5rem -0.1rem 2.5rem;

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
`;

//Cast 'a' to string literal
const as: 'a' = 'a';

interface Props {
  children: ReactNode;
  link: string;
  external?: boolean;
  click?: (url: string) => void;
}

const NavigationItem = ({ link, children, external }: Props) => {
  const additionalProps = external && {
    as,
    onClick: () => nw.Shell.openExternal(link),
  };

  return (
    <StyledNavLink to={link} {...additionalProps}>
      <div />
      {children}
    </StyledNavLink>
  );
};
export default NavigationItem;
