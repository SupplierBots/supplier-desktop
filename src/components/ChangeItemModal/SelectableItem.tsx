import React, { MouseEvent } from 'react';
import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme/main';
import { ReactComponent as DuplicateIcon } from 'assets/Duplicate.svg';
import { ReactComponent as RemoveIcon } from 'assets/Remove.svg';
import { UserDataItemType } from 'store/userData/types';
import { useSelector } from 'hooks/useSelector';
import { UserData } from 'types/UserData';
import uuid from 'uuid/v4';
import { addUserDataItem, removeUserDataItem } from 'store/userData/actions';
import { Product } from 'types/Product';
import { Profile } from 'types/Profile';
import routes from 'constants/routes';
import { useDispatch } from 'hooks/useDispatch';
import { push } from 'connected-react-router';
import { Proxy } from 'types/Proxy';
import Item from 'components/Item/Item';

interface Props {
  name: string;
  id: string;
  type: UserDataItemType;
  active?: boolean;
}

const IconCaption = styled.span<Props>`
  color: ${colors.lightGrey};
  background-color: ${({ active }) =>
    active ? colors.tertiaryBackground : colors.secondaryBackground};
  font: inherit;
  font-size: ${fonts.small};
  opacity: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 7rem;
  transition: 0.3s all;
  padding: 1rem 0 1rem 1.5rem;
`;

const IconsContainer = styled.div<Props>`
  display: flex;
  align-items: center;

  svg {
    height: 1.2rem;
    cursor: pointer;
    path {
      fill: ${colors.darkGrey};
      transition: 0.3s all;
    }

    :hover path {
      fill: ${colors.lightGrey};
    }

    :hover + ${IconCaption} {
      opacity: 1;
    }

    ${({ active }) =>
      active &&
      css`
        path {
          fill: url(#iconGradient45);
        }
      `}
  }
`;

const SelectableItem = (props: Props) => {
  const dispatch = useDispatch();
  const userDataItems = useSelector(state => state.userData[props.type]) as UserData[];

  const duplicateItem = (event: MouseEvent<HTMLOrSVGElement>) => {
    event.stopPropagation();
    const itemToDuplicate = userDataItems.find(item => item.id === props.id);

    if (itemToDuplicate) {
      const newItem = { ...itemToDuplicate, id: uuid() };
      if (props.type === 'products') {
        dispatch(addUserDataItem(props.type, newItem as Product));
      }
      if (props.type === 'profiles') {
        dispatch(addUserDataItem(props.type, newItem as Profile));
      }
      if (props.type === 'proxies') {
        dispatch(addUserDataItem(props.type, newItem as Proxy));
      }
    }
  };

  const removeItem = (event: MouseEvent<HTMLOrSVGElement>) => {
    event.stopPropagation();
    dispatch(removeUserDataItem(props.type, props.id));
    if (props.active) dispatch(push(routes[props.type]));
  };

  const loadItem = () => {
    if (!props.active) dispatch(push(routes[props.type] + '/' + props.id));
  };

  return (
    <Item selectable {...props} onClick={loadItem}>
      <IconsContainer {...props}>
        <DuplicateIcon onClick={duplicateItem} />
        <IconCaption {...props}>Duplicate</IconCaption>
        <RemoveIcon onClick={removeItem} />
        <IconCaption {...props}>Remove</IconCaption>
      </IconsContainer>
    </Item>
  );
};

export default SelectableItem;
