import React from 'react';
import styled from 'styled-components';

import { ReactComponent as MinimizeIcon } from 'assets/Minimize.svg';
import { ReactComponent as CloseIcon } from 'assets/Close.svg';
import { colors } from 'theme/main';
import nw from 'NW';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 5.5rem;
  height: 2.5rem;
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  z-index: 9999;
`;

const AppControl = styled.div`
  cursor: pointer;
  transition: all 0.3s;
  rect,
  path {
    fill: url(#appControlSVGGrandient);
    transition: all 0.3s;
  }
  :hover {
    transform: scale(1.1);
    filter: grayscale(75%);
  }
`;

const AppControls = () => {
  const minimizeApp = () => {
    nw.Window.get().minimize();
  };
  const closeApp = () => {
    nw.Window.get().close();
  };

  return (
    <Wrapper>
      <AppControl onClick={minimizeApp}>
        <MinimizeIcon />
      </AppControl>
      <AppControl onClick={closeApp}>
        <CloseIcon />
      </AppControl>
    </Wrapper>
  );
};

export default AppControls;
