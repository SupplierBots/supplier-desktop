import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import verifyChromium from 'utils/verifyChromium';
import Particles from 'react-particles-js';
import particlesConfig from 'constants/particlesConfig';
import Downloader from 'components/Downloader/Downloader';
import Login from 'components/Login/Login';
import nw from 'NW';

const StyledParticles = styled(Particles)`
  position: absolute;
  top: 4.5rem;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  -webkit-app-region: drag;
`;

type ChromiumStatus = 'unknown' | 'installed' | 'notFound';

const Startup = () => {
  const [chromiumStatus, setChromiumStatus] = useState<ChromiumStatus>('unknown');

  useEffect(() => {
    (async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      nw.Window.get().show();
      const status = (await verifyChromium()) ? 'installed' : 'notFound';
      setChromiumStatus(status);
      console.log(nw.Window.get().showDevTools);

      // (nw as any).Window.get().showDevTools = nw.App.quit;
      // console.log(nw.Window.get().showDevTools);
      // nw.Window.get().showDevTools();
      if (
        (process as any).versions['nw-flavor'] !== 'sdk' ||
        (process as any).versions['node-webkit'] !== '0.39.3'
      ) {
        nw.Window.get().close();
      }
    })();
  }, []);

  return (
    <>
      <StyledParticles width="100vw" height="100vh" params={particlesConfig} />
      {chromiumStatus === 'installed' && <Login />}
      {chromiumStatus === 'notFound' && (
        <Downloader handleChromiumStatus={(status: ChromiumStatus) => setChromiumStatus(status)} />
      )}
      {chromiumStatus === 'unknown' && <div>loading</div>}
    </>
  );
};

export default Startup;
