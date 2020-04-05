import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme/main';

interface Props {
  name: string;
  children: ReactNode;
  hasAction?: boolean;
}

const Name = styled.p`
  font-size: ${fonts.regular};
  color: ${colors.darkGrey};
  margin-bottom: 0.5rem;
`;

const Value = styled.span<{ hasAction: boolean }>`
  background: ${colors.mainGradient45};
  /* stylelint-disable-next-line */ /* prefix is necessary: background-clip doesn't work in Chromium */
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  transition: 0.3s all;

  ${({ hasAction }) =>
    hasAction &&
    css`
      :hover {
        cursor: pointer;
        filter: brightness(90%);
      }
    `}
`;

const Statistics = (props: Props) => (
  <Name {...props}>
    {props.name}: <Value hasAction={!!props.hasAction}>{props.children}</Value>
  </Name>
);

export default Statistics;
