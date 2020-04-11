import React, { useEffect } from 'react';
import styled from 'styled-components';
import Card from 'components/Card/Card';
import Heading from 'components/Heading/Heading';
import Browser from 'components/Browser/Browser';
import ButtonsContainer from 'components/ButtonsContainer/ButtonsContainer';
import Button from 'components/Button/Button';

import { IPCRenderer } from 'main/IPC/IPCRenderer';
import { createBrowser, removeBrowser } from 'store/browsers/browsersSlice';
import { useStateSelector, useStateDispatch } from 'hooks/typedReduxHooks';
import { removeTask } from 'store/tasks/tasksSlice';

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-column-gap: 3rem;
`;

const StyledCard = styled(Card)`
  width: 100%;
  grid-column: 1/3;
`;

const BrowsersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Browsers = () => {
  const browsers = useStateSelector(state => state.browsers);
  const tasks = useStateSelector(state => state.tasks);
  const dispatch = useStateDispatch();

  useEffect(
    () => () => {
      //BrowsersManager.getInstance().stopAll();
    },
    [],
  );

  const deleteBrowser = (id: string) => {
    dispatch(removeBrowser({ id }));
    const tasksToRemove = tasks.filter(t => t.browser?.value === id);
    console.log(tasksToRemove);
    tasksToRemove.forEach(t => dispatch(removeTask({ id: t.id })));
  };

  return (
    <Wrapper>
      <StyledCard>
        <Heading>Browsers</Heading>
        <BrowsersContainer>
          {browsers.map(b => (
            <Browser
              key={b.id}
              data={b}
              deleteAction={() => deleteBrowser(b.id)}
              canBeRemoved={browsers.length > 2 && !b.isActive}
              openAction={() => IPCRenderer.setupBrowser(b)}
            >
              {b.accountEmail}
            </Browser>
          ))}
        </BrowsersContainer>
      </StyledCard>
      <ButtonsContainer>
        <Button onClick={() => dispatch(createBrowser())} disabled={browsers?.length >= 10}>
          {browsers?.length >= 10 ? 'Max Browsers' : 'Add Browser'}
        </Button>
      </ButtonsContainer>
    </Wrapper>
  );
};

export default Browsers;
