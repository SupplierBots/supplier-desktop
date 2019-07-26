import React from 'react';
import styled from 'styled-components';
import NavigationItem from './NavigationItem';

import { ReactComponent as DashboardIcon } from 'assets/Dashboard.svg';
import { ReactComponent as TasksIcon } from 'assets/Tasks.svg';
import { ReactComponent as ProductsIcon } from 'assets/Products.svg';
import { ReactComponent as ProfilesIcon } from 'assets/Profiles.svg';
import { ReactComponent as ProxiesIcon } from 'assets/Proxies.svg';
import { ReactComponent as HarvestersIcon } from 'assets/Harvesters.svg';
import { ReactComponent as HelpIcon } from 'assets/Help.svg';
import routes from 'constants/routes';

const Wrapper = styled.nav``;

const NavigationList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Navigation = () => (
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

      <NavigationItem link={routes.products}>
        <ProductsIcon />
        Products
      </NavigationItem>

      <NavigationItem link={routes.profiles}>
        <ProfilesIcon />
        Profiles
      </NavigationItem>

      <NavigationItem link={routes.proxies}>
        <ProxiesIcon />
        Proxies
      </NavigationItem>

      <NavigationItem link={routes.harvesters}>
        <HarvestersIcon />
        Harvesters
      </NavigationItem>

      <NavigationItem external link={'https://safedropbot.com/'}>
        <HelpIcon />
        Help
      </NavigationItem>
    </NavigationList>
  </Wrapper>
);

export default Navigation;
