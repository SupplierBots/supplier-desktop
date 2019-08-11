import { hot } from 'react-hot-loader/root';
import React from 'react';
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
`;

const App = () => {
  const authenticated = useSelector(state => state.auth.authenticated);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        {authenticated && <Sidebar />}
        {!authenticated && <Redirect to={routes.startup} />}
        <Content>
          <Routes />
        </Content>
        <AppControls />
      </Wrapper>
    </>
  );
};

export default hot(App);
