import path from 'path';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import puppeteer from 'puppeteer';
import nw from 'NW';
import InlineLogo from 'components/InlineLogo/InlineLogo';
import { colors, fonts } from 'themes/main';
import ProgressBar from 'components/ProgressBar/ProgressBar';
import verifyChromium from 'utils/verifyChromium';
import { RouteComponentProps } from 'react-router';
import routes from 'constants/routes';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 13rem;
  z-index: 10;
  -webkit-app-region: drag;
`;

const ProgressMessage = styled.p`
  font-size: ${fonts.large};
  margin-top: 23rem;
  margin-bottom: 1.5rem;
`;

const TutorialMessage = styled.p`
  margin-top: 4rem;
  font-size: ${fonts.large};
  color: ${colors.darkGrey};
`;

const TutLink = styled.span`
  cursor: pointer;
  color: transparent;
  background: ${colors.mainGradient45};
  background-clip: text;
  /* stylelint-disable-next-line */ /* prefix is necessary: background-clip doesn't work in Chromium */
  -webkit-background-clip: text;
  transition: all 0.3s;
  :hover {
    color: ${colors.lightGrey};
  }
`;

type Props = RouteComponentProps;

const Downloader = ({ history }: Props) => {
  const [progress, setProgress] = useState(0);
  const [downloaded, setDownloaded] = useState(false);

  const fetchChromium = () => {
    const chromiumPath = path.resolve((nw as any).App.dataPath, '.local-chromium');
    const fetcher = puppeteer.createBrowserFetcher({ path: chromiumPath });
    console.log(chromiumPath);
    fetcher.download('674921', async (downloadedBytes: number, totalBytes: number) => {
      setProgress(Math.round((downloadedBytes / totalBytes) * 100));
      if (downloadedBytes === totalBytes) {
        setDownloaded(true);
        await new Promise(resolve => setTimeout(resolve, 10000));
        const chromiumInstalled = await verifyChromium();

        if (chromiumInstalled) {
          history.push(routes.login);
        } else {
          history.push(routes.downloader);
        }
      }
    });
  };

  useEffect(fetchChromium, []);

  return (
    <Wrapper>
      <InlineLogo />
      <ProgressMessage>
        {downloaded ? 'Installing...' : `Downloading remaining files (${progress}%)`}
      </ProgressMessage>
      <ProgressBar progressPercentage={progress} />
      <TutorialMessage>
        In the meantime you can read our{' '}
        <TutLink onClick={() => nw.Shell.openExternal('https://twitter.com/safedropbot')}>
          detailed tutorial
        </TutLink>
      </TutorialMessage>
    </Wrapper>
  );
};

export default Downloader;
