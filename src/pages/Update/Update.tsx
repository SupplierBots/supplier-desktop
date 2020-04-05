import React, { useEffect } from 'react';
import styled from 'styled-components';
import InlineLogo from 'components/InlineLogo/InlineLogo';
import { colors, fonts } from 'theme/main';

import { useStateSelector, useStateDispatch } from 'hooks/typedReduxHooks';
import { StyledParticles } from 'pages/Startup/Startup';
import particlesConfig from 'constants/particlesConfig';
import Spinner from 'components/Spinner/Spinner';
import { setUpdateStart } from 'store/update/updateSlice';
import { IPCRenderer } from 'main/IPC/IPCRenderer';

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
  font-size: ${fonts.heading};
  margin-top: 30rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
`;

const TutorialMessage = styled.p`
  margin-top: 4rem;
  font-size: ${fonts.large};
  color: ${colors.darkGrey};
`;

export const StyledSpinner = styled(Spinner)`
  font-size: 0.6rem;
  margin-left: 2rem;
`;

const Changelog = styled.span`
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

const Update = () => {
  const { error, downloading, number } = useStateSelector(state => state.update);
  const dispatch = useStateDispatch();

  useEffect(() => {
    dispatch(setUpdateStart());
    IPCRenderer.downloadUpdate();
  }, [dispatch]);

  const getCurrentMessage = () => {
    if (error) {
      return "Couldn't download update. Please try again later";
    }
    if (!downloading) {
      return 'Downloaded. Application will close to install the update';
    }

    return `Downloading ${number} update`;
  };

  return (
    <>
      <StyledParticles width="100vw" height="100vh" params={particlesConfig} />
      <Wrapper>
        <InlineLogo />
        <ProgressMessage>
          {getCurrentMessage()}
          {downloading && <StyledSpinner />}
        </ProgressMessage>
        <TutorialMessage>
          In the meantime you can read <Changelog>release notes</Changelog>
        </TutorialMessage>
      </Wrapper>
    </>
  );
};

export default Update;
