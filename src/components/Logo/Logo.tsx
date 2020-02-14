import React from 'react';
import styled from 'styled-components';
import { ReactComponent as BrandLogo } from 'assets/logo.svg';
import { fonts, colors } from 'theme/main';

const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 15rem;
  margin: 2.5rem 0;
`;

const BrandName = styled.h1`
  font-size: ${fonts.heading};
  color: ${colors.lightPurple};
  font-weight: 400;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  margin-top: 1.2rem;
`;

const PrimarySpan = styled.span`
  color: transparent;
  background: ${colors.mainGradient45};
  background-clip: text;
  /* stylelint-disable-next-line */ /* prefix is necessary: background-clip doesn't work in Chromium */
  -webkit-background-clip: text;
`;

const Logo = () => (
  <Wrapper>
    <BrandLogo />
    <BrandName>
      <PrimarySpan></PrimarySpan>SUPPLIER
    </BrandName>
  </Wrapper>
);

export default Logo;
