import React from 'react';
import styled from 'styled-components';
import NavigationItem from './NavigationItem';

import { ReactComponent as DashboardIcon } from 'assets/Dashboard.svg';
import { ReactComponent as TasksIcon } from 'assets/Tasks.svg';
import { ReactComponent as ProductsIcon } from 'assets/Products.svg';
import { ReactComponent as ProfilesIcon } from 'assets/Profiles.svg';
import { ReactComponent as ProxiesIcon } from 'assets/Proxies.svg';
import { ReactComponent as BrowsersIcon } from 'assets/Harvesters.svg';
import { ReactComponent as HelpIcon } from 'assets/Help.svg';
import routes from 'constants/routes';
import { useSelector } from 'hooks/useSelector';

const Wrapper = styled.nav``;

const NavigationList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Navigation = () => {
  const lastVisited = useSelector(state => state.lastVisited);
  const browsers = useSelector(state => state.browsers);
  const router = useSelector(state => state.router);

  const isAnyTaskActive = () =>
    router.location.pathname.includes('tasks') && browsers.some(b => b.isActive);

  return (
    <Wrapper>
      <NavigationList>
        <NavigationItem link={routes.dashboard} disabled={isAnyTaskActive()}>
          <DashboardIcon />
          Dashboard
        </NavigationItem>

        <NavigationItem link={routes.tasks}>
          <TasksIcon />
          Tasks
        </NavigationItem>

        <NavigationItem
          link={routes.products + `/${lastVisited.products}`}
          disabled={isAnyTaskActive()}
        >
          <ProductsIcon />
          Products
        </NavigationItem>

        <NavigationItem
          link={routes.profiles + `/${lastVisited.profiles}`}
          disabled={isAnyTaskActive()}
        >
          <ProfilesIcon />
          Profiles
        </NavigationItem>

        <NavigationItem
          link={routes.proxies + `/${lastVisited.proxies}`}
          disabled={isAnyTaskActive()}
        >
          <ProxiesIcon />
          Proxies
        </NavigationItem>

        <NavigationItem link={routes.browsers} disabled={isAnyTaskActive()}>
          <BrowsersIcon />
          Browsers
        </NavigationItem>

        <NavigationItem external link={'https://safedropbot.com/'}>
          <HelpIcon />
          Help
        </NavigationItem>
      </NavigationList>
    </Wrapper>
  );
};

export default Navigation;
