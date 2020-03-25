import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme/main';
import { shell } from 'electron';

interface Props {
  name: string;
  children: ReactNode;
  externalLink?: string;
}

const Name = styled.p`
  font-size: ${fonts.regular};
  color: ${colors.darkGrey};
  margin-bottom: 0.5rem;
`;

const Value = styled.span<{ hasLink: boolean }>`
  background: ${colors.mainGradient45};
  /* stylelint-disable-next-line */ /* prefix is necessary: background-clip doesn't work in Chromium */
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  transition: 0.3s all;

  ${({ hasLink }) =>
    hasLink &&
    css`
      :hover {
        cursor: pointer;
        filter: brightness(90%);
      }
    `}
`;

const Statistics = ({ name, children, externalLink }: Props) => (
  <Name>
    {name}:{' '}
    <Value
      hasLink={!!externalLink}
      {...(externalLink && { onClick: () => shell.openExternal(externalLink) })}
    >
      {children}
    </Value>
  </Name>
);

export default Statistics;
