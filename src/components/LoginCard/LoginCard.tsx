import styled from 'styled-components';
import Card from 'components/Card/Card';
import { colors } from 'theme/main';

const LoginCard = styled(Card)`
  position: relative;
  ::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    background-image: ${colors.mainGradient45};
    height: 1.5rem;
    clip-path: polygon(0 0, 100% 0, 100% 100%);
  }

  ::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    background-image: ${colors.mainGradient45};
    height: 1.5rem;
    clip-path: polygon(0 0, 100% 100%, 0 100%);
  }
`;
export default LoginCard;
