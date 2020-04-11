import styled from 'styled-components';
import { colors } from 'theme/main';

export const GradientParagraph = styled.span`
  color: transparent;
  background: ${colors.mainGradient45};
  /* stylelint-disable-next-line */ /* prefix is necessary: background-clip doesn't work in Chromium */
  -webkit-background-clip: text;
  background-clip: text;
`;
