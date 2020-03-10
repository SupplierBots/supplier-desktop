import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from 'assets/logo.svg';
import { colors } from 'theme/main';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LogoSVG = styled(Logo)`
  width: 5.15rem;
  height: 7.3rem;
`;

const LogoText = styled.h1`
  color: ${colors.lightPurple};
  margin-left: 2.5rem;
  font: inherit;
  font-size: 4rem;
  text-transform: uppercase;
  letter-spacing: 0.3rem;
`;

const PrimaryLogoText = styled.span`
  color: transparent;
  background: ${colors.mainGradient45};
  background-clip: text;
  /* stylelint-disable-next-line */ /* prefix is necessary: background-clip doesn't work in Chromium */
  -webkit-background-clip: text;
`;

const InlineLogo = () => (
  <Wrapper>
    <LogoSVG />
    <LogoText>
      SUPPLIER<PrimaryLogoText></PrimaryLogoText>
    </LogoText>
  </Wrapper>
);

export default InlineLogo;
