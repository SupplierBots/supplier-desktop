import styled from 'styled-components';

const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
  transition: 0.3s all;
  :disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;
export default Fieldset;
