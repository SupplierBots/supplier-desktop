import React from 'react';
import styled from 'styled-components';
import { colors } from 'theme/main';
import { ReactComponent as WebsiteIcon } from 'assets/Website.svg';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 6.7% 23% 20% 19% 23% 8.3%;
  width: 100%;
  color: ${colors.lightPurple};
`;
const WebsiteIconWrapper = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
`;
const TasksHeader = () => {
  return (
    <Wrapper>
      <WebsiteIconWrapper>
        <WebsiteIcon />
      </WebsiteIconWrapper>
      <Text>Name</Text>
      <Text>Profile</Text>
      <Text>Proxy</Text>
      <Text>Status</Text>
      <Text>Actions</Text>
    </Wrapper>
  );
};

export default TasksHeader;
