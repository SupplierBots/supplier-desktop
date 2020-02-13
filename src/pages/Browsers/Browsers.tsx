import React, { useEffect } from 'react';
import styled from 'styled-components';
import Card from 'components/Card/Card';
import Heading from 'components/Heading/Heading';
import Browser from 'components/Browser/Browser';
import ButtonsContainer from 'components/ButtonsContainer/ButtonsContainer';
import Button from 'components/Button/Button';
import { useSelector } from 'hooks/useSelector';
import { useDispatch } from 'hooks/useDispatch';

import BrowsersManager from 'bot/BrowsersManager';
import { createBrowser, removeBrowser } from 'store/browsers/actions';

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
  const browsers = useSelector(state => state.browsers);
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      BrowsersManager.getInstance().closeAll();
    },
    [],
  );

  return (
    <Wrapper>
      <StyledCard>
        <Heading>Browsers</Heading>
        <BrowsersContainer>
          {browsers.map(b => (
            <Browser
              key={b.id}
              data={b}
              deleteAction={() => dispatch(removeBrowser(b.id))}
              canBeRemoved={browsers.length > 2 && !b.isActive}
              openAction={() => BrowsersManager.getInstance().setup(b)}
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
