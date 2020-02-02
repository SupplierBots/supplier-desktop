import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme/main';
import Button from 'components/Button/Button';
import { ReactComponent as RemoveIcon } from 'assets/Remove.svg';

interface Props {
  children: ReactNode;
  path: string;
  deleteAction: () => void;
  canBeRemoved?: boolean;
}

const Wrapper = styled.div`
  height: 7rem;
  width: 100%;
  background-color: ${colors.tertiaryBackground};
  display: flex;
  justify-content: space-between;
  align-items: center;
  :not(:last-of-type) {
    margin-bottom: 1rem;
  }

  div {
    align-self: stretch;
    background: ${colors.mainGradientTB};
    width: 0.2rem;
    margin-right: 3.5rem;
  }
`;

const StyledRemoveIcon = styled(RemoveIcon)<{ canBeRemoved?: boolean }>`
  margin: 0 3rem;
  width: 1.6rem;
  transition: all 0.3s;
  path {
    fill: ${({ canBeRemoved }) => (canBeRemoved ? 'url(#iconGradient)' : colors.darkGrey)};
  }

  ${({ canBeRemoved }) =>
    canBeRemoved &&
    css`
      :hover {
        color: ${colors.lightGrey};
        cursor: pointer;
        transform: scale(1.1);
        path {
          fill: ${colors.lightGrey};
        }
      }
    `}
`;

const Name = styled.p`
  font-size: ${fonts.regular};
  color: ${colors.lightGrey};
  margin-right: auto;
`;

const Harvester = ({ children, deleteAction, canBeRemoved }: Props) => (
  <Wrapper>
    <div />
    <Name>{children}</Name>
    <Button secondary small bgColor={colors.tertiaryBackground}>
      Open To Login
    </Button>
    {canBeRemoved ? <StyledRemoveIcon canBeRemoved onClick={deleteAction} /> : <StyledRemoveIcon />}
  </Wrapper>
);

export default Harvester;
