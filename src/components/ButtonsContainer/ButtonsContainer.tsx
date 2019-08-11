import styled from 'styled-components';

const ButtonsContainer = styled.div`
  align-self: end;
  grid-column: 1/3;
  display: flex;
  justify-content: flex-end;
  button:not(:first-of-type) {
    margin-left: 1.5rem;
  }
  button:first-of-type:not(:only-child) {
    justify-self: flex-start;
    margin-right: auto;
  }
`;

export default ButtonsContainer;
