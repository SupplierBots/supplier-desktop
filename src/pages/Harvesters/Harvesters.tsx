import React from 'react';
import styled from 'styled-components';
import Card from 'components/Card/Card';
import Heading from 'components/Heading/Heading';
import Harvester from 'components/Harvester/Harvester';
import ButtonsContainer from 'components/ButtonsContainer/ButtonsContainer';
import Button from 'components/Button/Button';
import { useSelector } from 'hooks/useSelector';
import { useDispatch } from 'hooks/useDispatch';
import uuid from 'uuid';
import { addUserDataItem, removeUserDataItem } from 'store/userData/actions';

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
  const harvesters = useSelector(state => state.userData.harvesters);
  const dispatch = useDispatch();

  const addNewHarvester = () => {
    const randomID = uuid();
    const newHarvester = {
      id: randomID,
      path: randomID.replace(/-/g, ''),
    };
    dispatch(addUserDataItem('harvesters', newHarvester));
  };

  return (
    <Wrapper>
      <StyledCard>
        <Heading>Harvesters</Heading>
        {harvesters.map((h, index) => (
          <Harvester
            key={h.id}
            path={h.path}
            deleteAction={() => dispatch(removeUserDataItem('harvesters', h.id))}
            canBeRemoved={harvesters.length > 2}
          >
            Captcha Harvester {index + 1}
          </Harvester>
        ))}
      </StyledCard>
      <ButtonsContainer>
        <Button onClick={addNewHarvester} disabled={harvesters.length >= 5}>
          {harvesters.length >= 5 ? 'Max Harvesters' : 'Add Harvester'}
        </Button>
      </ButtonsContainer>
    </Wrapper>
  );
};

export default Harvesters;
