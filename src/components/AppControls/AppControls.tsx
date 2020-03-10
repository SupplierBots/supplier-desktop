import React from 'react';
import styled from 'styled-components';

import { ReactComponent as MinimizeIcon } from 'assets/Minimize.svg';
import { ReactComponent as CloseIcon } from 'assets/Close.svg';
import { colors } from 'theme/main';
import { IPCRenderer } from 'main/IPC/IPCRenderer';

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
    cursor: pointer;
  }
`;

const AppControls = () => {
  const minimizeApp = () => {
    IPCRenderer.minimize();
  };

  const closeApp = () => {
    IPCRenderer.close();
  };

  return (
    <Wrapper>
      {process.platform === 'win32' && (
        <>
          <AppControl onClick={minimizeApp}>
            <MinimizeIcon />
          </AppControl>
          <AppControl onClick={closeApp}>
            <CloseIcon />
          </AppControl>
        </>
      )}
    </Wrapper>
  );
};

export default AppControls;
