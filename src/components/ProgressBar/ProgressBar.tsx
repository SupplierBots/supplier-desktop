import styled from 'styled-components';
import { colors } from 'theme/main';

interface Props {
  progressPercentage: number;
}

const ProgressBar = styled.div<Props>`
  position: relative;
  background: none;
  border: double 1px transparent;
  background-image: linear-gradient(${colors.primaryBackground}, ${colors.primaryBackground}),
    ${colors.mainGradientLR};
  background-origin: border-box;
  background-clip: padding-box, border-box;
  width: 35rem;
  height: 2rem;
  border-radius: 0.5rem;
  z-index: 10;

  ::after {
    content: '';
    position: absolute;
    top: 0.3rem;
    left: 0.3rem;
    height: 1.2rem;
    width: calc(${({ progressPercentage }) => progressPercentage} / 100 * 34.2rem);
    background: ${colors.mainGradientLR};
    z-index: 20;
    border-radius: 0.2rem;
    transition: 1s all;
  }
`;

export default ProgressBar;
