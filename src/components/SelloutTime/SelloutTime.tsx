import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as SupremeLogo } from 'assets/SupremeLogo.svg';
import { ReactComponent as PalaceLogo } from 'assets/PalaceLogo.svg';
import { colors, fonts } from 'theme/main';
import { SelloutTime as SelloutTimeType } from 'store/dashboard/dashboardSlice';
import { shell } from 'electron';

const Wrapper = styled.div`
  height: 5rem;
  width: 21rem;
  border-radius: 0.5rem;
  background-color: ${colors.tertiaryBackground};
  display: flex;
  padding: 1.5rem 1.5rem;
  align-items: center;

  :first-of-type {
    margin-bottom: 1rem;
  }
`;

const Week = styled.p`
  font-size: ${fonts.regular};
  color: ${colors.lightGrey};
  margin-left: 1.5rem;
`;

const RegionLink = styled.div<{ available?: boolean }>`
  height: 2rem;
  width: 2rem;
  border-radius: 0.5rem;
  border: 1px double transparent;
  background-image: linear-gradient(${colors.tertiaryBackground}, ${colors.tertiaryBackground}),
    ${colors.mainGradient45};
  background-origin: border-box;
  background-clip: padding-box, border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s all;

  :first-of-type {
    margin-left: auto;
    margin-right: 1rem;
  }

  :hover {
    filter: brightness(90%);
    cursor: pointer;
  }

  ${({ available }) =>
    !available &&
    css`
      filter: grayscale(100%);
      :hover {
        filter: grayscale(100%);
        cursor: not-allowed;
      }
    `}
`;

const RegionName = styled.span`
  font-size: 0.8rem;
  color: transparent;
  background: ${colors.mainGradient45};
  /* stylelint-disable-next-line */ /* prefix is necessary: background-clip doesn't work in Chromium */
  -webkit-background-clip: text;
  background-clip: text;
`;

interface Props {
  isPalace?: boolean;
  details: SelloutTimeType;
}

const SelloutTime = ({ isPalace, details }: Props) => (
  <Wrapper>
    {isPalace ? <PalaceLogo /> : <SupremeLogo />}
    <Week>Week {details.week}</Week>
    <RegionLink
      available={!!details.eu}
      {...(!!details.eu && {
        onClick: () => shell.openExternal(details.eu ?? 'https://supremecommunity.com/'),
      })}
    >
      <RegionName>UK</RegionName>
    </RegionLink>

    <RegionLink
      available={!!details.us}
      {...(!!details.us && {
        onClick: () => shell.openExternal(details.us ?? 'https://supremecommunity.com/'),
      })}
    >
      <RegionName>US</RegionName>
    </RegionLink>
  </Wrapper>
);

export default SelloutTime;
