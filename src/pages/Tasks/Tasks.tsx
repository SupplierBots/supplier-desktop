import React, { useEffect } from 'react';
import styled from 'styled-components';
import ButtonsContainer from 'components/ButtonsContainer/ButtonsContainer';
import Button from 'components/Button/Button';
import Heading from 'components/Heading/Heading';
import { colors, fonts, shadows } from 'theme/main';
import Task from 'components/Task/Task';
import TasksHeader from 'components/TasksHeader/TasksHeader';
import TaskEditor from 'components/TaskEditor/TaskEditor';
import { Route, RouteComponentProps } from 'react-router';
import routes from 'constants/routes';
import { IPCRenderer } from 'main/IPC/IPCRenderer';
import { useStateSelector, useStateDispatch } from 'hooks/typedReduxHooks';
import { removeAllTasks } from 'store/tasks/tasksSlice';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: row;
  height: 100%;
`;

const StyledHeading = styled(Heading)`
  color: ${colors.lightPurple};
  font-size: 2.4rem;
  ::after {
    width: calc(100% + 5.5rem);
  }
`;

const Main = styled.div`
  font-size: ${fonts.regular};
`;

const TasksList = styled.div`
  box-shadow: ${shadows.primary};
`;

const NoTaskInformation = styled.p`
  height: 50rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${fonts.regular};
  padding-bottom: 3rem;
  color: ${colors.darkGrey};
`;

const Tasks = ({ history }: RouteComponentProps) => {
  const { tasks, browsers } = useStateSelector(state => state);
  const dispatch = useStateDispatch();
  const isAnyBrowserAvailable = () => {
    return browsers.filter(b => !tasks.some(t => t.browser && t.browser.value === b.id)).length > 0;
  };

  const createNewTask = () => {
    if (!isAnyBrowserAvailable()) return;
    history.push(routes.tasksEditor + '/new');
  };

  const isAnyTaskActive = () => browsers.some(b => b.isActive);

  useEffect(
    () => () => {
      // BrowsersManager.getInstance().stopAll();
    },
    [],
  );

  const handleTasks = async () => {
    if (!isAnyTaskActive()) {
      IPCRenderer.startTasks(tasks);
      return;
    }
    IPCRenderer.stopTasks();
  };

  return (
    <Wrapper>
      <Route path={routes.tasksEditor + '/:id'} component={TaskEditor} />
      <Main>
        <StyledHeading>Tasks</StyledHeading>
        <TasksList>
          <TasksHeader />
          {tasks.map(task => (
            <Task key={task.id} details={task} />
          ))}
        </TasksList>
        {tasks.length === 0 && <NoTaskInformation>You don't have any tasks</NoTaskInformation>}
      </Main>
      <ButtonsContainer>
        <Button
          disabled={isAnyTaskActive() || tasks.length === 0}
          secondary
          onClick={() => dispatch(removeAllTasks())}
        >
          Remove All
        </Button>

        <Button secondary onClick={handleTasks} disabled={tasks.length === 0}>
          {isAnyTaskActive() ? 'Stop All' : 'Start All'}
        </Button>

        <Button disabled={!isAnyBrowserAvailable() || isAnyTaskActive()} onClick={createNewTask}>
          {!isAnyBrowserAvailable() ? 'All Browsers Used' : 'Create Task'}
        </Button>
      </ButtonsContainer>
    </Wrapper>
  );
};

export default Tasks;
