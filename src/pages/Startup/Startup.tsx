import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import verifyChromium from 'utils/verifyChromium';
import Particles from 'react-particles-js';
import particlesConfig from 'constants/particlesConfig';
import Downloader from './Downloader/Downloader';
import Login from './Login/Login';
import nw from 'NW';
import routes from 'constants/routes';
import { Route, RouteComponentProps } from 'react-router';
import Loader from './Loader/Loader';
import { fadeIn } from 'theme/animations';
import { useDispatch } from 'hooks/useDispatch';
import { useSelector } from 'hooks/useSelector';
import { setActive } from 'store/browsers/actions';

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
      console.log(nw);
      nw.Window.get().show();
      const chromiumInstalled = await verifyChromium();

      setLoading(false);

      if (chromiumInstalled) {
        history.push(routes.login);
      } else {
        history.push(routes.downloader);
      }

      //console.log(nw.Window.get().showDevTools);
      // (nw as any).Window.get().showDevTools = nw.App.quit;
      // console.log(nw.Window.get().showDevTools);
      // nw.Window.get().showDevTools();
      // if (
      //   (process as any).versions['nw-flavor'] === 'chuj' ||
      //   (process as any).versions['node-webkit'] !== '0.39.3'
      // ) {
      //   nw.Window.get().close();
      // }
    })();
  }, [history]);

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
