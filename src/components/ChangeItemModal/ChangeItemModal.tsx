import React, { MouseEvent } from 'react';
import styled from 'styled-components';

import Card from 'components/Card/Card';
import Heading from 'components/Heading/Heading';
import { ReactComponent as CloseIcon } from 'assets/Close.svg';
import { colors } from 'theme/main';
import Item from './SelectableItem';
import { UserDataItemType } from 'store/userData/types';
import { useSelector } from 'hooks/useSelector';
import { UserData } from 'types/UserData';

const CloseButton = styled.div`
  position: absolute;
  right: 3rem;
  top: 2.7rem;
  z-index: 9999;
  cursor: pointer;
  rect,
  path {
    fill: ${colors.pink};
    transition: all 0.3s;
  }
  :hover {
    transform: scale(1.1);
    rect,
    path {
      fill: ${colors.lightPurple};
    }
  }
`;

const Wrapper = styled.div`
  margin-top: 6.1rem;
  z-index: 5000;
  position: relative;
  height: max-content;
`;
const StyledCard = styled(Card)`
  padding-top: 4rem;
  padding-bottom: 3.5rem;
  max-height: 60rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 0.3rem;
    border-radius: 2rem;
    overflow: hidden;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.mainGradientTB};
    border-radius: 2rem;
  }
`;
interface Props {
  close: () => void;
  type: UserDataItemType;
  modalTitle: string;
  active: string;
}

const ChangeItemModal = ({ close, type, modalTitle, active }: Props) => {
  const userData = useSelector(state => state.userData[type]) as UserData[];

  const handleCardClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <Wrapper onClick={handleCardClick}>
      <StyledCard disableBottomPolygon>
        <CloseButton onClick={close}>
          <CloseIcon />
        </CloseButton>
        <Heading>{modalTitle}</Heading>
        {userData.map(item => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            type={type}
            active={item.id === active}
          />
        ))}
      </StyledCard>
    </Wrapper>
  );
};

export default ChangeItemModal;
