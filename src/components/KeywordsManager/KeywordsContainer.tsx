import styled, { css } from 'styled-components';
import { colors } from 'themes/main';

const KeywordsContainer = styled.div<{ error: boolean }>`
  background-color: ${colors.tertiaryBackground};
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  padding: 1.4rem 1.9rem 1rem 1.9rem;
  height: 16.8rem;
  overflow-y: scroll;
  border: double 1px transparent;
  position: relative;

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 0.3rem;
    border-radius: 2rem;
    overflow: hidden;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.mainGradientTB};
    border-radius: 2rem;
  }

  ${({ error }) =>
    error &&
    css`
      background-image: linear-gradient(${colors.tertiaryBackground}, ${colors.tertiaryBackground}),
        ${colors.redDanger};
      background-origin: border-box;
      background-clip: padding-box, border-box;
    `}
`;

export default KeywordsContainer;
