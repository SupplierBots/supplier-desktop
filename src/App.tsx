import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'hooks/useSelector';
import GlobalStyle from 'theme/GlobalStyle';
import Sidebar from 'components/Sidebar/Sidebar';
import AppControls from 'components/AppControls/AppControls';
import routes from 'constants/routes';

import { colors } from 'theme/main';
import Routes from 'routes/Routes';

const Wrapper = styled.div`
  color: ${colors.lightGrey};
  background-color: ${colors.primaryBackground};
  height: 100vh;
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-columns: 77.5%;
  grid-auto-flow: column;
  overflow: hidden;
`;

const Content = styled.main`
  padding: 4.5rem 3.9rem 3.9rem 3.8rem;
  overflow: hidden;
  -webkit-app-region: drag;
  position: relative;
  z-index: 10;
`;

declare const chrome: any;

const App = () => {
  const disableAutofill = () => {
    try {
      chrome.settingsPrivate.setPref('autofill.credit_card_enabled', false);
      chrome.settingsPrivate.setPref('autofill.profile_enabled', false);
    } catch {}
  };

  useEffect(disableAutofill, []);
  const authState = useSelector(state => state.auth);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        {authState.authenticated && <Sidebar />}
        {!authState.authenticated && <Redirect to={routes.startup} />}
        <Content>
          <Routes />
        </Content>
        <AppControls />
      </Wrapper>
    </>
  );
};

export default hot(App);
