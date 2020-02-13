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
  return (
    <Wrapper>
      <NavigationList>
        <NavigationItem link={routes.dashboard}>
          <DashboardIcon />
          Dashboard
        </NavigationItem>

        <NavigationItem link={routes.tasks}>
          <TasksIcon />
          Tasks
        </NavigationItem>

        <NavigationItem link={routes.products + `/${lastVisited.products}`}>
          <ProductsIcon />
          Products
        </NavigationItem>

        <NavigationItem link={routes.profiles + `/${lastVisited.profiles}`}>
          <ProfilesIcon />
          Profiles
        </NavigationItem>

        <NavigationItem link={routes.proxies + `/${lastVisited.proxies}`}>
          <ProxiesIcon />
          Proxies
        </NavigationItem>

        <NavigationItem link={routes.browsers}>
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
