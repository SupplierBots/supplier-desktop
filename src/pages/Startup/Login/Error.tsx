import styled from 'styled-components';
import { fonts, colors } from 'theme/main';

interface Props {
  visible: boolean;
}
const Error = styled.p<Props>`
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-size: ${fonts.regular};
  color: transparent;
  background: ${colors.redDanger};
  /* stylelint-disable-next-line */ /* prefix is necessary: background-clip doesn't work in Chromium */
  -webkit-background-clip: text;
  background-clip: text;
`;

export default Error;
