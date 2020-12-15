import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InlineLogo from 'components/InlineLogo/InlineLogo';
import { colors, fonts } from 'theme/main';
import ProgressBar from 'components/ProgressBar/ProgressBar';
import { RouteComponentProps } from 'react-router';
import { ipcRenderer as ipc, IpcRendererEvent, shell } from 'electron';
import { IPCRenderer } from 'main/IPC/IPCRenderer';
import { StyledSpinner } from 'pages/Update/Update';
import { config } from 'config';
import Button from 'components/Button/Button';
import { ReactComponent as ChromeLogo } from 'assets/Chrome.svg';
import ButtonsContainer from 'components/ButtonsContainer/ButtonsContainer';
import routes from 'constants/routes';
import { setAppDetails } from 'store/controller/controllerSlice';
import { useStateDispatch } from 'hooks/typedReduxHooks';

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
  display: flex;
  align-items: center;
`;

const StyledChromeLogo = styled(ChromeLogo)`
  height: 6rem;
  width: 6rem;
  margin-bottom: 1.5rem;
`;

const StyledButtonsContainer = styled(ButtonsContainer)`
  align-self: center;
`;

const TutorialMessage = styled.p`
  position: absolute;
  bottom: 10rem;
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

const MissingChromeInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 7.5rem;
  margin-bottom: 2rem;
  width: 70rem;
  text-align: center;
`;

type Props = RouteComponentProps;

const Downloader = ({ history }: Props) => {
  const [verifying, setVerifying] = useState(false);
  const dispatch = useStateDispatch();

  const verifyChromium = async () => {
    setVerifying(true);
    const { success, executablePath, version } = await IPCRenderer.checkIfChromeInstalled();
    await new Promise(r => setTimeout(r, 1000));

    if (success) {
      dispatch(setAppDetails({ path: executablePath, version }));
      history.push(routes.login);
    }

    setVerifying(false);
  };

  return (
    <Wrapper>
      <InlineLogo />
      <MissingChromeInfo>
        <StyledChromeLogo />
        <ProgressMessage>
          {verifying ? 'Looking for Google Chrome' : `Couldn't find Google Chrome.`}
          {verifying && <StyledSpinner />}
        </ProgressMessage>
        {!verifying && (
          <ProgressMessage>It is required for the bot to work properly.</ProgressMessage>
        )}
      </MissingChromeInfo>
      {!verifying && (
        <StyledButtonsContainer>
          <Button small onClick={() => shell.openExternal(config.chromeUrl)}>
            Download
          </Button>
          <Button small onClick={verifyChromium}>
            Try again
          </Button>
        </StyledButtonsContainer>
      )}

      <TutorialMessage>
        In the meantime you can read our{' '}
        <TutLink onClick={() => shell.openExternal(config.tutorialUrl)}>detailed tutorial</TutLink>
      </TutorialMessage>
    </Wrapper>
  );
};

export default Downloader;
