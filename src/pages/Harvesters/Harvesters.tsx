import React from 'react';
import styled from 'styled-components';
import Card from 'components/Card/Card';
import Heading from 'components/Heading/Heading';
import Harvester from 'components/Harvester/Harvester';
import ButtonsContainer from 'components/ButtonsContainer/ButtonsContainer';
import Button from 'components/Button/Button';

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-column-gap: 3rem;
`;

const StyledCard = styled(Card)`
  width: 100%;
  grid-column: 1/3;
`;

const Harvesters = () => {
  return (
    <Wrapper>
      <StyledCard>
        <Heading>Harvesters</Heading>
        <Harvester />
        <Harvester />
        <Harvester />
      </StyledCard>
      <ButtonsContainer>
        <Button>Add Harvester</Button>
      </ButtonsContainer>
    </Wrapper>
  );
};

export default Harvesters;
