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
import { setActive, removeBrowser } from 'store/harvesters/harvestersSlice';
import { setAppDetails, setTimerState } from 'store/controller/controllerSlice';
import { useStateSelector, useStateDispatch } from 'hooks/typedReduxHooks';
import { setTaskActivity } from 'store/tasks/tasksSlice';
import { setScheduler } from 'store/scheduler/schedulerSlice';

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
  const { harvesters, tasks, scheduler } = useStateSelector(state => state);
  const dispatch = useStateDispatch();

  const resetState = () => {
    dispatch(setTimerState({ active: false }));
    harvesters.forEach(h => {
      dispatch(setActive({ id: h.id, isActive: false }));
    });

    const harvestersToDelete = harvesters.slice(3, 6);
    harvestersToDelete.forEach(h => dispatch(removeBrowser({ id: h.id })));

    if (scheduler.time.length > 0 && scheduler.time.length < 10) {
      dispatch(
        setScheduler({
          data: {
            ...scheduler,
            scheduled: false,
            time: '',
          },
        }),
      );
    }

    tasks.forEach(t => dispatch(setTaskActivity({ id: t.id, isActive: false })));
  };

  useEffect(resetState, []);

  useEffect(() => {
    (async () => {
      const {
        success: isChromeInstalled,
        executablePath,
        version,
      } = await IPCRenderer.checkIfChromeInstalled();
      const isBrowserEngineInstalled = await IPCRenderer.checkIfBrowserEngineInstalled();
      setLoading(false);

      if (isChromeInstalled && isBrowserEngineInstalled) {
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
