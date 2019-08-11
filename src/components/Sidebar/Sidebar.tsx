import React from 'react';
import styled from 'styled-components';
import Logo from 'components/Logo/Logo';
import Navigation from 'components/Navigation/Navigation';
import ExternalLinksBox from './ExternalLinksBox';
import { colors, shadows } from 'theme/main';
const Wrapper = styled.aside`
  color: ${colors.darkGrey};
  background-color: ${colors.secondaryBackground};
  box-shadow: ${shadows.sidebar};
  display: flex;
  flex-direction: column;
  -webkit-app-region: drag;
  z-index: 2000;
`;

const TopPolygon = styled.div`
  background-image: ${colors.mainGradient45};
  height: 2.5rem;
  clip-path: polygon(0 0, 100% 0, 100% 100%);
`;

const BottomPolygon = styled(TopPolygon)`
  clip-path: polygon(0 0, 100% 100%, 0 100%);
  margin-top: auto;
`;

const Sidebar = () => (
  <Wrapper>
    <TopPolygon />
    <Logo />
    <Navigation />
    <ExternalLinksBox />
    <BottomPolygon />
  </Wrapper>
);

export default Sidebar;
