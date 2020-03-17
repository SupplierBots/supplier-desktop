import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { colors, fonts } from 'theme/main';

interface Props {
  name: string;
  children: ReactNode;
}

const Name = styled.p`
  font-size: ${fonts.regular};
  color: ${colors.darkGrey};
  margin-bottom: 0.5rem;
`;

const Value = styled.span`
  background: ${colors.mainGradient45};
  /* stylelint-disable-next-line */ /* prefix is necessary: background-clip doesn't work in Chromium */
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Statistics = ({ name, children }: Props) => (
  <Name>
    {name}: <Value>{children}</Value>
  </Name>
);

export default Statistics;
