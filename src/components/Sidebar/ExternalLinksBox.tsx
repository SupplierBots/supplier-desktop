import React from 'react';
import styled from 'styled-components';

import { ReactComponent as InstagramIcon } from 'assets/Instagram.svg';
import { ReactComponent as DiscordIcon } from 'assets/Discord.svg';
import { ReactComponent as TwitterIcon } from 'assets/Twitter.svg';
import { colors } from 'theme/main';
import { shell } from 'electron';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
  width: 50%;
  cursor: pointer;
  margin-top: auto;
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
  return (
    <Wrapper>
      <ExternalLink onClick={() => shell.openExternal('https://discordapp.com/')}>
        <DiscordIcon />
      </ExternalLink>

      <ExternalLink onClick={() => shell.openExternal('https://www.instagram.com/supplierbot/')}>
        <InstagramIcon />
      </ExternalLink>

      <ExternalLink onClick={() => shell.openExternal('https://twitter.com/safedropbot')}>
        <TwitterIcon />
      </ExternalLink>
    </Wrapper>
  );
};

export default ExternalLinksBox;
