import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme/main';
import { ReactComponent as RemoveIcon } from 'assets/Close.svg';
import { slideInFromLeft } from 'theme/animations';

interface Props {
  children: ReactNode;
  onClick: () => void;
  multi?: boolean;
  negative?: boolean;
}

const Wrapper = styled.div<Props>`
  color: ${colors.primaryBackground};
  background: ${colors.mainGradient45};
  font-size: ${fonts.medium};
  height: 2.6rem;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.5rem;
  padding: 0 0.5rem;
  margin-bottom: 1rem;
  animation: ${slideInFromLeft} 0.3s forwards;
  :not(:last-of-type) {
    margin-right: 0.8rem;
  }
  cursor: pointer;
  ${({ negative }) =>
    negative &&
    css`
      color: ${colors.darkGrey};
      background: ${colors.tertiaryBackground};
      border: 1px solid ${colors.darkGrey};
    `}

  ${({ multi }) =>
    multi &&
    css`
      border: double 1px transparent;
      background-image: linear-gradient(${colors.tertiaryBackground}, ${colors.tertiaryBackground}),
        ${colors.mainGradient45};
      background-origin: border-box;
      background-clip: padding-box, border-box;
    `}
`;
interface IconProps {
  multi: string;
  negative: string;
}
const StyledRemoveIcon = styled(RemoveIcon)<IconProps>`
  height: 1.9rem;
  width: 1.9rem;

  path {
    fill: ${colors.primaryBackground};
    ${({ negative }) => negative === 'true' && `fill: ${colors.darkGrey}`};
    ${({ multi }) => multi === 'true' && `fill: ${colors.pink}`};
    transition: 0.3s all;
  }
  ${/* sc-selector */ Wrapper}:hover & {
    path {
      fill: ${colors.lightGrey};
    }
  }
`;

const Text = styled.span<Props>`
  margin: 0px 1rem 0 0.5rem;
  text-transform: capitalize;
  ${({ multi }) =>
    multi &&
    css`
      color: transparent;
      background: ${colors.mainGradient45};
      -webkit-background-clip: text;
    `}
`;

const Keyword = (props: Props) => (
  <Wrapper {...props}>
    <StyledRemoveIcon multi={`${props.multi}`} negative={`${props.negative}`} />
    <Text {...props}>{props.children}</Text>
  </Wrapper>
);

export default Keyword;
