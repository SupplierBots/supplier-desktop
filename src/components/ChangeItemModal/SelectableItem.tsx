import React, { MouseEvent } from 'react';
import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme/main';
import { ReactComponent as DuplicateIcon } from 'assets/Duplicate.svg';
import { ReactComponent as RemoveIcon } from 'assets/Remove.svg';

import { UserData } from 'main/types/UserData';
import uuid from 'uuid/v4';
import { Product } from 'main/types/Product';
import { Profile } from 'main/types/Profile';
import routes from 'constants/routes';
import { push } from 'connected-react-router';
import { Proxy } from 'main/types/Proxy';
import Item from 'components/Item/Item';
import { addProduct, removeProduct } from 'store/products/productsSlice';
import { addProfile, removeProfile } from 'store/profiles/profilesSlice';
import { addProxy, removeProxy } from 'store/proxies/proxiesSlice';
import {
  setLastVisitedProduct,
  setLastVisitedProfile,
  setLastVisitedProxy,
} from 'store/lastVisited/lastVisitedSlice';
import { useStateDispatch, useStateSelector } from 'hooks/typedReduxHooks';
import { removeTask } from 'store/tasks/tasksSlice';
import { Task } from 'main/types/Task';
import { resetProxy } from 'store/harvesters/harvestersSlice';

interface Props {
  name: string;
  id: string;
  type: 'proxies' | 'profiles' | 'products';
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
  const dispatch = useStateDispatch();
  const userDataItems = useStateSelector(state => state[props.type]) as UserData[];
  const { tasks, harvesters: browsers } = useStateSelector(state => state);

  const duplicateItem = (event: MouseEvent<HTMLOrSVGElement>) => {
    event.stopPropagation();
    const itemToDuplicate = userDataItems.find(item => item.id === props.id);

    if (itemToDuplicate) {
      const newItem = { ...itemToDuplicate, id: uuid() };
      if (props.type === 'products') {
        dispatch(addProduct({ item: newItem as Product }));
      }
      if (props.type === 'profiles') {
        dispatch(addProfile({ item: newItem as Profile }));
      }
      if (props.type === 'proxies') {
        dispatch(addProxy({ item: newItem as Proxy }));
      }
    }
  };

  const removeItem = (event: MouseEvent<HTMLOrSVGElement>) => {
    event.stopPropagation();
    let tasksToRemove: Task[] = [];
    if (props.type === 'products') {
      dispatch(removeProduct({ id: props.id }));
      tasksToRemove.push(...tasks.filter(t => t.products.some(p => p === props.id)));
    }
    if (props.type === 'profiles') {
      dispatch(removeProfile({ id: props.id }));
      tasksToRemove.push(...tasks.filter(t => t.profile?.value === props.id));
    }
    if (props.type === 'proxies') {
      tasksToRemove.push(...tasks.filter(t => t.proxy?.value === props.id));
      const harvestersToReset = browsers.filter(h => h.proxy.value === props.id);
      harvestersToReset.forEach(h => dispatch(resetProxy({ id: h.id })));
      dispatch(removeProxy({ id: props.id }));
    }

    tasksToRemove.forEach(t => dispatch(removeTask({ id: t.id })));

    if (props.active) {
      if (props.type === 'products') {
        dispatch(setLastVisitedProduct({ id: '' }));
      }
      if (props.type === 'profiles') {
        dispatch(setLastVisitedProfile({ id: '' }));
      }
      if (props.type === 'proxies') {
        dispatch(setLastVisitedProxy({ id: '' }));
      }
      dispatch(push(routes[props.type]));
    }
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
