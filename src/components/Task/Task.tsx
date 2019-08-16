import React from 'react';
import styled from 'styled-components';
import { colors, fonts } from 'theme/main';
import { ReactComponent as SupremeIcon } from 'assets/SupremeLogo.svg';
import { ReactComponent as PalaceIcon } from 'assets/PalaceLogo.svg';
import { ReactComponent as EditIcon } from 'assets/Edit.svg';
import { ReactComponent as RemoveIcon } from 'assets/Remove.svg';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 6.7% 23% 20% 19% 23% 8.3%;
  width: 100%;
  height: 5rem;
  align-items: center;
  color: ${colors.lightGrey};
  font-size: ${fonts.medium};
  :nth-child(odd) {
    background: ${colors.tertiaryBackground};
  }

  :nth-child(even) {
    background: ${colors.secondaryBackground};
  }
`;
const Text = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
`;

const WebsiteIconWrapper = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Action = styled.div`
  margin-right: 1.3rem;

  transition: 0.3s all;
  svg {
    height: 1.5rem;
    path {
      fill: url(#iconGradient45);
    }
  }
  :hover {
    cursor: pointer;
    transform: scale(1.15);
    filter: grayscale(85%);
  }
`;

const StyledRemoveIcon = styled(RemoveIcon)`
  &:first-child {
    height: 1.4rem;
  }
`;
const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.3rem;
`;
const Task = () => {
  return (
    <Wrapper>
      <WebsiteIconWrapper>
        <PalaceIcon />
      </WebsiteIconWrapper>
      <Text>Box Logo Sweatshirt</Text>
      <Text>Mastercard PKO</Text>
      <Text>Localhost</Text>
      <Text>Waiting For Product</Text>
      <ActionsContainer>
        <Action>
          <EditIcon />
        </Action>
        <Action>
          <StyledRemoveIcon />
        </Action>
      </ActionsContainer>
    </Wrapper>
  );
};

export default Task;
