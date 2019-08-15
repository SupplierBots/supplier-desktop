import styled from 'styled-components';
import { rotate } from 'theme/animations';
import { colors } from 'theme/main';

interface Props {
  main?: boolean;
  bgColor?: string;
}

const Spinner = styled.div<Props>`
  animation: ${rotate} 1s infinite linear;
  background: ${colors.pink};
  background: linear-gradient(to right, ${colors.pink} 10%, rgba(255, 255, 255, 0) 42%);
  border-radius: 50%;

  height: 5em;
  margin-top: ${({ main }) => (main ? '25rem' : '0')};
  position: relative;
  width: 5em;

  &:before {
    background: ${colors.pink};
    border-radius: 100% 0 0 0;
    content: '';
    position: absolute;
    height: 50%;
    width: 50%;
    top: 0;
    left: 0;
  }

  &:after {
    content: '';
    background: ${({ bgColor }) => bgColor || colors.primaryBackground};
    position: absolute;
    height: 75%;
    width: 75%;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default Spinner;
