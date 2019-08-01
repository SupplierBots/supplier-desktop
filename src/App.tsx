import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { useSelector } from 'hooks/useSelector';
import GlobalStyle from 'themes/GlobalStyle';
import Sidebar from 'components/Sidebar/Sidebar';
import AppControls from 'components/AppControls/AppControls';
import routes from 'constants/routes';
import Profiles from 'pages/Profiles/Profiles';

import { colors } from 'themes/main';

import Startup from 'pages/Startup/Startup';

const App = () => {
  const activeTheme = useSelector(state => state.theme.active);
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={activeTheme}>
        <Wrapper>
          {true && <Sidebar />}
          <Content>
            <Switch>
              <Route path={routes.startup} component={Startup} />
              <Route path={routes.profiles} component={Profiles} />
            </Switch>
          </Content>
          <AppControls />
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

export default hot(App);

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
`;
