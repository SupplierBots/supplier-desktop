import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Particles from 'react-particles-js';
import particlesConfig from 'constants/particlesConfig';
import Downloader from './Downloader/Downloader';
import Login from './Login/Login';
import routes from 'constants/routes';
import { Route, RouteComponentProps } from 'react-router';
import Loader from './Loader/Loader';
import { fadeIn } from 'theme/animations';

import { IPCRenderer } from 'main/IPC/IPCRenderer';
import { setActive } from 'store/browsers/browsersSlice';
import { setAppDetails, setTimerState } from 'store/controller/controllerSlice';
import { useStateSelector, useStateDispatch } from 'hooks/typedReduxHooks';

export const StyledParticles = styled(Particles)`
  position: absolute;
  top: 4.5rem;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  -webkit-app-region: drag;
  opacity: 0;
  animation: ${fadeIn} 2s forwards;
`;

type Props = RouteComponentProps;

const Startup = ({ history }: Props) => {
  const [loading, setLoading] = useState(true);
  const browsers = useStateSelector(state => state.browsers);
  const dispatch = useStateDispatch();

  const resetBrowsers = () => {
    dispatch(setTimerState({ active: false }));
    browsers.forEach(b => {
      dispatch(setActive({ id: b.id, isActive: false }));
    });
  };

  useEffect(resetBrowsers, []);

  useEffect(() => {
    (async () => {
      const { success, executablePath, version } = await IPCRenderer.verifyChromium();

      setLoading(false);

      if (success) {
        dispatch(setAppDetails({ path: executablePath, version }));
        history.push(routes.login);
      } else {
        history.push(routes.downloader);
      }
    })();
  }, [history, dispatch]);

  return (
    <>
      <StyledParticles width="100vw" height="100vh" params={particlesConfig} />
      {loading && <Loader />}
      <Route path={routes.downloader} component={Downloader} />
      <Route path={routes.login} component={Login} />
    </>
  );
};

export default Startup;
