import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InlineLogo from 'components/InlineLogo/InlineLogo';
import { colors, fonts } from 'theme/main';
import ProgressBar from 'components/ProgressBar/ProgressBar';
import { RouteComponentProps } from 'react-router';
import { ipcRenderer as ipc, IpcRendererEvent } from 'electron';
import { IPCRenderer } from 'main/IPC/IPCRenderer';
import { CHROMIUM_DOWNLOAD_PROGRESS } from '../../../main/IPC/IPCEvents';

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

  const handleDownloadProgress = (
    e: IpcRendererEvent,
    status: { done: boolean; progress: number },
  ) => {
    setProgress(status.progress);
    if (!status.done) return;
    ipc.removeListener(CHROMIUM_DOWNLOAD_PROGRESS, handleDownloadProgress);
    setDownloaded(true);
    verifyChromium();
  };

  const verifyChromium = async () => {
    //* Wait to install
    await new Promise(resolve => setTimeout(resolve, 10000));

    IPCRenderer.relaunch();
  };

  const fetchChromium = () => {
    IPCRenderer.downloadChromium();
    ipc.on(CHROMIUM_DOWNLOAD_PROGRESS, handleDownloadProgress);
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
        In the meantime you can read our <TutLink>detailed tutorial</TutLink>
      </TutorialMessage>
    </Wrapper>
  );
};

export default Downloader;
