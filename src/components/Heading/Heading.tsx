import styled from 'styled-components';
import { colors, fonts } from 'theme/main';

const Heading = styled.h2`
  color: ${colors.lightPurple};
  font: inherit;
  font-size: ${fonts.large};
  display: inline-block;
  position: relative;
  margin-bottom: 32px;
  ::after {
    content: '';
    position: absolute;
    height: 1px;
    width: calc(100% + 3.7rem);
    background: ${colors.mainGradientLR};
    bottom: -8px;
    left: 0;
  }
`;

export default Heading;
