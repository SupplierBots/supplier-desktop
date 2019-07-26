import styled from 'styled-components';
import { colors, fonts } from 'themes/main';

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
    width: 140%;
    background: ${colors.mainGradientLR};
    bottom: -8px;
    left: 0;
  }
`;

export default Heading;
