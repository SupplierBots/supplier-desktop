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
  const tasks = useSelector(state => state.userData.tasks);
  return (
    <Wrapper>
      <Route path={routes.tasksEditor + '/:id'} component={TaskEditor} />
      <Main>
        <StyledHeading>Tasks</StyledHeading>
        <TasksList>
          <TasksHeader />
          {tasks.map(task => (
            <Task details={task} />
          ))}
          {tasks.length === 0 && <NoTaskInformation>You don't have any tasks</NoTaskInformation>}
        </TasksList>
      </Main>
      <ButtonsContainer>
        <Button secondary>Open Harvesters</Button>
        <Button secondary>Start All Tasks</Button>
        <Button onClick={() => history.push(routes.tasksEditor + '/new')}>Create Task</Button>
      </ButtonsContainer>
    </Wrapper>
  );
};

export default Tasks;
