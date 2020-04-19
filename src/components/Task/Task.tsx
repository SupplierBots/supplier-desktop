import React from 'react';
import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme/main';
import { ReactComponent as SupremeIcon } from 'assets/SupremeLogo.svg';
import { ReactComponent as PalaceIcon } from 'assets/PalaceLogo.svg';
import { ReactComponent as EditIcon } from 'assets/Edit.svg';
import { ReactComponent as RemoveIcon } from 'assets/Remove.svg';
import { Task as TaskType } from 'main/types/Task';
import { push } from 'connected-react-router';
import routes from 'constants/routes';
import { fadeIn } from 'theme/animations';
import { TaskStatusType } from 'main/types/TaskStatus';
import { removeTask } from 'store/tasks/tasksSlice';
import { useStateSelector, useStateDispatch } from 'hooks/typedReduxHooks';
import * as _ from 'lodash';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 6.7% 23% 20% 19% 23% 8.3%;
  width: 100%;
  height: 5rem;
  align-items: center;
  color: ${colors.lightGrey};
  font-size: ${fonts.medium};
  animation: ${fadeIn} 0.3s forwards;
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

const Action = styled.div<{ disabled?: boolean }>`
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

  ${({ disabled }) =>
    disabled &&
    css`
      filter: grayscale(85%);
      :hover {
        cursor: not-allowed;
        transform: scale(1);
      }
    `};
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

const Status = styled(Text)<{ type: TaskStatusType }>`
  ${({ type }) =>
    type === TaskStatusType.Inactive &&
    css`
      color: ${colors.darkGrey};
    `};

  ${({ type }) =>
    type === TaskStatusType.Action &&
    css`
      color: ${colors.lightGrey};
    `};

  ${({ type }) =>
    type === TaskStatusType.Success &&
    css`
      color: transparent;
      background: ${colors.mainGradient45};
      -webkit-background-clip: text;
    `};

  ${({ type }) =>
    type === TaskStatusType.Error &&
    css`
      color: transparent;
      background: ${colors.redDanger};
      -webkit-background-clip: text;
    `};
`;

interface Props {
  details: TaskType;
}
const Task = ({ details }: Props) => {
  const dispatch = useStateDispatch();
  const { isTimerActive } = useStateSelector(state => state.controller);

  const isBrowserActive = () => {
    return isTimerActive || details.isActive;
  };

  const deleteTask = () => {
    if (isBrowserActive()) return;
    dispatch(removeTask({ id: details.id }));
  };

  const editTask = () => {
    if (isBrowserActive()) return;
    dispatch(push(routes.tasksEditor + '/' + details.id));
  };

  return (
    <Wrapper>
      <WebsiteIconWrapper>
        {details.site && details.site.label === 'Palace' ? <PalaceIcon /> : <SupremeIcon />}
      </WebsiteIconWrapper>
      <Text>{details.name}</Text>
      <Text>{details.profile && details.profile.label}</Text>
      <Text>Proxy</Text>
      <Status type={details.status.type}>{details.status.message}</Status>
      <ActionsContainer>
        <Action disabled={isBrowserActive()}>
          <EditIcon onClick={editTask} />
        </Action>
        <Action disabled={isBrowserActive()}>
          <StyledRemoveIcon onClick={deleteTask} />
        </Action>
      </ActionsContainer>
    </Wrapper>
  );
};

export default Task;
