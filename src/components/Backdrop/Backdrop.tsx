import styled from 'styled-components';
import { slideInUp } from 'theme/animations';

interface Props {
  visible: boolean;
}

const Backdrop = styled.div<Props>`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(10, 10, 10, 0.6);
  z-index: 1000;
  -webkit-app-region: drag;
  backdrop-filter: blur(0.2rem);
  justify-content: center;
  opacity: 0;
  animation: ${slideInUp} 0.5s forwards;
`;

export default Backdrop;
