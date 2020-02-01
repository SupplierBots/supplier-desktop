import React from 'react';
import styled from 'styled-components';
import { ReactComponent as SupremeLogo } from 'assets/SupremeLogo.svg';
import { ReactComponent as PalaceLogo } from 'assets/PalaceLogo.svg';
import { colors, fonts } from 'theme/main';

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

const RegionLink = styled.div`
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
}

const SelloutTime = ({ isPalace }: Props) => {
  //Redux useSelector
  return (
    <Wrapper>
      {isPalace ? <PalaceLogo /> : <SupremeLogo />}
      <Week>Week 20</Week>
      <RegionLink>
        <RegionName>UK</RegionName>
      </RegionLink>
      <RegionLink>
        <RegionName>US</RegionName>
      </RegionLink>
    </Wrapper>
  );
};

export default SelloutTime;
