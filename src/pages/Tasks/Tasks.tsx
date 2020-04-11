import React from 'react';
import styled from 'styled-components';
import Heading from 'components/Heading/Heading';
import { colors, fonts, shadows } from 'theme/main';
import Task from 'components/Task/Task';
import TasksHeader from 'components/TasksHeader/TasksHeader';
import TaskEditor from 'components/TaskEditor/TaskEditor';
import { Route } from 'react-router';
import routes from 'constants/routes';
import { useStateSelector } from 'hooks/typedReduxHooks';
import { TaskRunner } from 'components/TaskRunner/TaskRunner';

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
  max-height: 55rem;
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

const Tasks = () => {
  const { tasks } = useStateSelector(state => state);

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
      <TaskRunner />
    </Wrapper>
  );
};

export default Tasks;
