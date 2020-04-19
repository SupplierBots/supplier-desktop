import React from 'react';
import styled from 'styled-components';
import Heading from 'components/Heading/Heading';
import Harvester from 'components/Harvester/Harvester';
import ButtonsContainer from 'components/ButtonsContainer/ButtonsContainer';
import Button from 'components/Button/Button';

import { createHarvester } from 'store/harvesters/harvestersSlice';
import { useStateSelector, useStateDispatch } from 'hooks/typedReduxHooks';
import { colors } from 'theme/main';

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: row;
`;

const HarvestersContainer = styled.div`
  margin-top: 3rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const StyledHeading = styled(Heading)`
  color: ${colors.lightPurple};
  font-size: 2.4rem;
  ::after {
    width: calc(100% + 5.5rem);
  }
`;

const Main = styled.div`
  max-height: 55rem;
`;

const Settings = () => {
  const harvesters = useStateSelector(state => state.harvesters);
  const dispatch = useStateDispatch();

  return (
    <Wrapper>
      <Main>
        <StyledHeading>Harvesters</StyledHeading>
        <HarvestersContainer>
          {harvesters.map(b => (
            <Harvester key={b.id} data={b} />
          ))}
        </HarvestersContainer>
      </Main>

      <ButtonsContainer>
        <Button onClick={() => dispatch(createHarvester())} disabled={harvesters?.length >= 6}>
          {harvesters?.length >= 6 ? 'Max Harvesters' : 'Add Harvester'}
        </Button>
      </ButtonsContainer>
    </Wrapper>
  );
};

export default Settings;
