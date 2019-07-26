import React from 'react';
import styled from 'styled-components';

import { ReactComponent as LogoutIcon } from 'assets/Logout.svg';
import { ReactComponent as DiscordIcon } from 'assets/Discord.svg';
import { ReactComponent as TwitterIcon } from 'assets/Twitter.svg';
import { colors } from 'themes/main';
import nw from 'NW';

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

const ExternalLinksBox = () => (
  <Wrapper>
    <ExternalLink onClick={() => nw.Shell.openExternal('https://twitter.com/safedropbot')}>
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

export default ExternalLinksBox;
