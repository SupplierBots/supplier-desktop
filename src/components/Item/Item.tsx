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

interface Props {
  name: string;
  id: string;
  type: UserDataItemType;
  active?: boolean;
}

const Wrapper = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.5rem;
  height: 3.7rem;
  background: ${colors.tertiaryBackground};
  border: 1px solid ${colors.darkGrey};
  padding: 0 1.75rem;
  margin-bottom: 1rem;
  transition: 0.3s all;
  position: relative;
  :hover {
    cursor: pointer;
    background: ${colors.secondaryBackground};
  }

  ${({ active }) =>
    active &&
    css`
      &,
      &:hover {
        cursor: default;
        background: linear-gradient(${colors.tertiaryBackground}, ${colors.tertiaryBackground}),
          ${colors.mainGradient45};
        background-origin: border-box;
        border: double 1px transparent;
        background-clip: padding-box, border-box;
      }
    `}
`;
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
          fill: url(#iconGradient);
        }
      `}
  }
`;

const Name = styled.span<Props>`
  font-size: ${fonts.regular};
  color: ${colors.darkGrey};
  ${({ active }) =>
    active &&
    css`
      color: transparent;
      background: ${colors.mainGradient45};
      -webkit-background-clip: text;
    `}
`;

const Item = (props: Props) => {
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
    <Wrapper {...props} onClick={loadItem}>
      <Name {...props}>{props.name}</Name>
      <IconsContainer {...props}>
        <DuplicateIcon onClick={duplicateItem} />
        <IconCaption {...props}>Duplicate</IconCaption>

        <RemoveIcon onClick={removeItem} />
        <IconCaption {...props}>Remove</IconCaption>
      </IconsContainer>
    </Wrapper>
  );
};

export default Item;
