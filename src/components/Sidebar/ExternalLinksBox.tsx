import React from 'react';
import styled from 'styled-components';

import { ReactComponent as LogoutIcon } from 'assets/Logout.svg';
import { ReactComponent as DiscordIcon } from 'assets/Discord.svg';
import { ReactComponent as TwitterIcon } from 'assets/Twitter.svg';
import { colors } from 'theme/main';
import { initiateUserLogout } from 'store/auth/actions';
import { shell } from 'electron';
import { useStateDispatch, useStateSelector } from 'hooks/typedReduxHooks';

const Wrapper = styled.div`
  display: flex;
  margin-top: 11rem;
  justify-content: space-between;
  align-self: center;
  width: 50%;
  cursor: pointer;
`;

const ExternalLink = styled.a`
  transition: all 0.3s;
  path {
    transition: all 0.3s;
  }

  :hover {
    transform: scale(1.1);
    path {
      fill: ${colors.pink};
    }
  }
`;

const ExternalLinksBox = () => {
  const dispatch = useStateDispatch();
  const uid = useStateSelector(state => state.auth.uid);

  return (
    <Wrapper>
      <ExternalLink onClick={() => dispatch(initiateUserLogout(uid))}>
        <LogoutIcon />
      </ExternalLink>

      <ExternalLink onClick={() => shell.openExternal('https://safedropbot.com/')}>
        <DiscordIcon />
      </ExternalLink>

      <ExternalLink onClick={() => shell.openExternal('https://safedropbot.com/')}>
        <TwitterIcon />
      </ExternalLink>
    </Wrapper>
  );
};

export default ExternalLinksBox;
