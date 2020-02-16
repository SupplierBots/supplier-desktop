import React from 'react';
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
import { useSelector } from 'hooks/useSelector';
import { useDispatch } from 'hooks/useDispatch';
import { removeUserDataItem, removeAllItems as removeAllDataItems } from 'store/userData/actions';
import BrowsersManager from 'bot/BrowsersManager';
import { monitor } from 'bot/palace/entry';
import autoRetryRequest from 'bot/autoRetryRequest';
import { fetchOnce } from 'bot/fetchOnce';

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
  height: 45rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${fonts.regular};
  padding-bottom: 3rem;
  color: ${colors.darkGrey};
`;

const Tasks = ({ history }: RouteComponentProps) => {
  const { userData, browsers } = useSelector(state => state);
  const dispatch = useDispatch();
  const isAnyBrowserAvailable = () => {
    return (
      browsers.filter(b => !userData.tasks.some(t => t.browser && t.browser.value === b.id))
        .length > 0
    );
  };

  const removeAllTasks = () => {
    dispatch(removeAllDataItems('tasks'));
  };

  const createNewTask = () => {
    if (!isAnyBrowserAvailable()) return;
    history.push(routes.tasksEditor + '/new');
  };

  const showTime = async () => {
    const time = await monitor.fetchProducts();
    console.log(time);
  };

  const shotTimeRefresh = async () => {
    const time = await monitor.fetchProducts(true);
    console.log(time);
  };

  return (
    <Wrapper>
      <Route path={routes.tasksEditor + '/:id'} component={TaskEditor} />
      <Main>
        <StyledHeading>Tasks</StyledHeading>
        <TasksList>
          <TasksHeader />
          {userData.tasks.map(task => (
            <Task key={task.id} details={task} />
          ))}
          {userData.tasks.length === 0 && (
            <NoTaskInformation>You don't have any tasks</NoTaskInformation>
          )}
        </TasksList>
      </Main>
      <ButtonsContainer>
        <Button secondary onClick={showTime}>
          Remove All
        </Button>
        <Button secondary onClick={shotTimeRefresh}>
          Remove sd
        </Button>
        <Button secondary onClick={() => BrowsersManager.getInstance().startTasks(userData.tasks)}>
          Start All Tasks
        </Button>
        <Button disabled={!isAnyBrowserAvailable()} onClick={createNewTask}>
          {!isAnyBrowserAvailable() ? 'All Browsers Used' : 'Create Task'}
        </Button>
      </ButtonsContainer>
    </Wrapper>
  );
};

export default Tasks;
