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
import { useDispatch } from 'hooks/useDispatch';
import { useSelector } from 'hooks/useSelector';
import { setActive } from 'store/browsers/actions';
import { ipcRenderer } from 'electron';
import { VERIFY_CHROME, ChromiumVerifiedPayload } from 'IPCEvents';
import { setChromiumPath } from 'store/controller/actions';

const StyledParticles = styled(Particles)`
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
  const browsers = useSelector(state => state.browsers);
  const dispatch = useDispatch();

  const resetBrowsers = () => {
    browsers.forEach(b => {
      dispatch(setActive(b.id, false));
    });
  };

  useEffect(resetBrowsers, []);

  useEffect(() => {
    (async () => {
      console.log('started verufy');

      const { success, executablePath } = (await ipcRenderer.invoke(
        VERIFY_CHROME,
      )) as ChromiumVerifiedPayload;

      console.log('response: ' + success + executablePath);

      setLoading(false);

      if (success) {
        dispatch(setChromiumPath(executablePath));
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
