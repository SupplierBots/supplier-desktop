import React, { useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as LogoutIcon } from 'assets/Logout.svg';
import { ReactComponent as DiscordIcon } from 'assets/Discord.svg';
import { ReactComponent as TwitterIcon } from 'assets/Twitter.svg';
import { colors } from 'themes/main';
import nw from 'NW';
import { useDispatch } from 'hooks/useDispatch';
import { changeAuthState } from 'store/auth/actions';
import { RouteComponentProps, Redirect } from 'react-router';
import routes from 'constants/routes';

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
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(changeAuthState(false));
  };

  return (
    <Wrapper>
      <ExternalLink onClick={logout}>
        <LogoutIcon />
      </ExternalLink>

      <ExternalLink onClick={() => nw.Shell.openExternal('https://discordapp.com/')}>
        <DiscordIcon />
      </ExternalLink>

      <ExternalLink onClick={() => nw.Shell.openExternal('https://twitter.com/safedropbot')}>
        <TwitterIcon />
      </ExternalLink>
    </Wrapper>
  );
};

export default ExternalLinksBox;
