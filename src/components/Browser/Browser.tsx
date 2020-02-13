import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme/main';
import Button from 'components/Button/Button';
import { ReactComponent as RemoveIcon } from 'assets/Remove.svg';
import { BrowserData } from 'types/BrowserData';

interface Props {
  children: ReactNode;
  data: BrowserData;
  deleteAction: () => void;
  openAction: () => void;
  canBeRemoved?: boolean;
}

const Wrapper = styled.div`
  height: 7rem;
  width: 49%;
  background-color: ${colors.tertiaryBackground};
  display: flex;
  justify-content: space-between;
  align-items: center;

  :nth-of-type(odd) {
    margin-right: 1rem;
  }

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
  margin-top: 0.1rem;
`;

const Browser = ({ children, deleteAction, canBeRemoved, openAction, data }: Props) => (
  <Wrapper>
    <div />
    <Name>{children}</Name>
    {!data.isLogged && (
      <Button
        secondary
        small
        disabled={data.isActive}
        bgColor={colors.tertiaryBackground}
        onClick={openAction}
      >
        {data.isActive ? 'Active' : 'Open To Login'}
      </Button>
    )}

    {canBeRemoved ? <StyledRemoveIcon canBeRemoved onClick={deleteAction} /> : <StyledRemoveIcon />}
  </Wrapper>
);

export default Browser;
