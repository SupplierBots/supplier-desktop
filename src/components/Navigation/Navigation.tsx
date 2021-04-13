import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import NavigationItem from './NavigationItem';

import { ReactComponent as DashboardIcon } from 'assets/Dashboard.svg';
import { ReactComponent as TasksIcon } from 'assets/Start.svg';
import { ReactComponent as ProfilesIcon } from 'assets/Profiles.svg';
import { ReactComponent as ProxiesIcon } from 'assets/Proxies.svg';
import { ReactComponent as SettingsIcon } from 'assets/Settings.svg';
import { ReactComponent as HelpIcon } from 'assets/Help.svg';
import { ReactComponent as DownloadIcon } from 'assets/Download.svg';
import { ReactComponent as LogoutIcon } from 'assets/Logout.svg';
import routes from 'constants/routes';
import { useStateDispatch, useStateSelector } from 'hooks/typedReduxHooks';
import { config } from 'config';
import { resetCredentials } from 'store/authPersist/authPersistSlice';
import { initiateLogout } from 'store/auth/authEpics';

const Wrapper = styled.nav``;

const NavigationList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Navigation = () => {
  const lastVisited = useStateSelector(state => state.lastVisited);
  const browsers = useStateSelector(state => state.harvesters);
  const router = useStateSelector(state => state.router);
  const { isTimerActive } = useStateSelector(state => state.controller);
  const { isUpdateAvailable, number } = useStateSelector(state => state.update);

  const isAnyTaskActive = () =>
    isTimerActive || (router.location.pathname.includes('tasks') && browsers.some(b => b.isActive));

  const dispatch = useStateDispatch();
  const uid = useStateSelector(state => state.auth.uid);

  return (
    <Wrapper>
      <NavigationList>
        {isUpdateAvailable && (
          <NavigationItem
            link={routes.update}
            disabled={isAnyTaskActive()}
            name={`Update ${number}`}
            alwaysActive
          >
            <DownloadIcon />
          </NavigationItem>
        )}

        <NavigationItem link={routes.dashboard} disabled={isAnyTaskActive()} name="Dashboard">
          <DashboardIcon />
        </NavigationItem>

        <NavigationItem link={routes.tasks} name="Tasks">
          <TasksIcon />
        </NavigationItem>

        <NavigationItem
          link={routes.profiles + `/${lastVisited.profile}`}
          disabled={isAnyTaskActive()}
          name="Profiles"
        >
          <ProfilesIcon />
        </NavigationItem>

        <NavigationItem
          link={routes.proxies + `/${lastVisited.proxy}`}
          disabled={isAnyTaskActive()}
          name="Proxies"
        >
          <ProxiesIcon />
        </NavigationItem>

        <NavigationItem link={routes.settings} disabled={isAnyTaskActive()} name="Settings">
          <SettingsIcon />
        </NavigationItem>

        <NavigationItem external link={config.tutorialUrl} name="Help">
          <HelpIcon />
        </NavigationItem>
        <NavigationItem
          name="Logout"
          link="logout"
          customAction={(e: MouseEvent) => {
            e.preventDefault();
            dispatch(resetCredentials());
            dispatch(initiateLogout({ uid }));
          }}
        >
          <LogoutIcon />
        </NavigationItem>
      </NavigationList>
    </Wrapper>
  );
};

export default Navigation;
