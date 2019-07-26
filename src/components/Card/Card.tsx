import styled from 'styled-components';
import { colors, shadows } from 'themes/main';

const Card = styled.div`
  background-color: ${colors.secondaryBackground};
  position: relative;
  width: 41rem;
  padding: 2.8rem 4.5rem 6rem 4.5rem;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-top: 2.4rem;
  box-shadow: ${shadows.primary};

  ::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 14rem;
    background: ${colors.mainGradientLR};
    bottom: 0;
    right: 0;
    clip-path: polygon(100% 0, 0% 100%, 100% 100%);
  }
`;

export default Card;
