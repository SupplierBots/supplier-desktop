import React from 'react';
import styled from 'styled-components';
import ButtonsContainer from 'components/ButtonsContainer/ButtonsContainer';
import Button from 'components/Button/Button';
import Heading from 'components/Heading/Heading';
import { colors, fonts, shadows } from 'theme/main';
import { ReactComponent as WebsiteIcon } from 'assets/Website.svg';
import Task from 'components/Task/Task';

const Wrapper = styled.div`
  display: grid;
  grid-column-gap: 3rem;
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
  grid-column: 1/3;
  font-size: ${fonts.regular};
`;

const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 6.7% 23% 20% 19% 23% 8.3%;
  width: 100%;
  color: ${colors.lightPurple};
`;
const TaskHeader = styled.div`
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

const TasksList = styled.div`
  box-shadow: ${shadows.primary};
`;

const Tasks = () => {
  return (
    <Wrapper>
      <Main>
        <StyledHeading>Tasks</StyledHeading>
        <TasksList>
          <ListHeader>
            <WebsiteIconWrapper>
              <WebsiteIcon />
            </WebsiteIconWrapper>
            <TaskHeader>Name</TaskHeader>
            <TaskHeader>Profile</TaskHeader>
            <TaskHeader>Proxy</TaskHeader>
            <TaskHeader>Status</TaskHeader>
            <TaskHeader>Actions</TaskHeader>
          </ListHeader>
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
        </TasksList>
      </Main>
      <ButtonsContainer>
        <Button secondary>Open Harvesters</Button>
        <Button secondary>Start All Tasks</Button>
        <Button submit>Create Task</Button>
      </ButtonsContainer>
    </Wrapper>
  );
};

export default Tasks;
