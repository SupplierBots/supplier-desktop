import React from 'react';
import Button from 'components/Button/Button';
import styled from 'styled-components';
import { ReactComponent as Logo } from 'assets/logo.svg';
import { colors, fonts } from 'theme/main';
import Card from 'components/Card/Card';

const StyledHtml = styled.html`
  @import url('https://fonts.googleapis.com/css?family=Lato:100,200,300,400&display=swap');
  *,
  *::before,
  *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    user-select: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-app-region: no-drag;
  }

  html {
    /* 16px * 62.5% = 10px = 1rem */
    font-size: 62.5%;
  }

  body {
    font-family: 'Lato', sans-serif;
    overflow: hidden;
    color: ${colors.lightGrey};
    background-color: ${colors.primaryBackground};
  }

  a,
  a:hover {
    text-decoration: none;
    -webkit-user-drag: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: ${fonts.heading};
  color: ${colors.lightGrey};
  height: 100vh;
  padding: 7rem 0;
`;

const StyledButton = styled(Button)`
  margin-top: 5rem;
`;

const StyledLogo = styled(Logo)`
  height: 6rem;
  width: 4rem;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.lightPurple};
  text-transform: uppercase;
`;

const HeaderPrimaryText = styled.span`
  color: transparent;
  background: ${colors.mainGradient45};
  background-clip: text;
  /* stylelint-disable-next-line */ /* prefix is necessary: background-clip doesn't work in Chromium */
  -webkit-background-clip: text;
`;

const SetupDescription = styled.p`
  font-size: 1.5rem;
  padding: 0 4rem;
  text-align: justify;
`;

const StyledCard = styled(Card)`
  padding: 6.2rem 0;
  height: 20rem;
  width: 100vw;
`;

const BrowserSetupPage = () => {
  return (
    <StyledHtml>
      <head>
        <title>Browser Setup</title>
        <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, maximum-scale=0.7, minimum-scale=0.7" />
      </head>

      <body>
        <Wrapper>
          <Header>
            <StyledLogo />
            <p>
              Browser <HeaderPrimaryText>setup</HeaderPrimaryText>
            </p>
          </Header>
          <StyledCard disableBottomPolygon>
            <SetupDescription>
              We recommend to log into your google account to decrease the chance of getting
              captcha. The more activity you have on this account and the older it is the better.
            </SetupDescription>
          </StyledCard>

          <StyledButton>Login</StyledButton>
        </Wrapper>
      </body>
    </StyledHtml>
  );
};

export default BrowserSetupPage;
