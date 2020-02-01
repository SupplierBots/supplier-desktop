import React from 'react';
import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme/main';
import { ReactComponent as SupremeLogo } from 'assets/SupremeLogo.svg';
import { ReactComponent as PalaceLogo } from 'assets/PalaceLogo.svg';

interface Props {
  available?: boolean;
  isPalace?: boolean;
}

const Wrapper = styled.div<Props>`
  height: 8rem;
  width: 15.5rem;
  border-radius: 0.5rem;
  background: ${colors.tertiaryBackground};
  color: ${colors.darkGrey};
  border: 1px solid ${colors.darkGrey};
  padding: 1.6rem 3rem;
  text-align: right;
  position: relative;
  transition: 0.3s all;

  :nth-child(odd) {
    margin-right: 1rem;
    margin-bottom: 1rem;
  }

  :hover {
    filter: brightness(90%);
    cursor: pointer;
  }

  ${({ available }) =>
    available &&
    css`
      border: 1px double transparent;
      background-image: linear-gradient(${colors.tertiaryBackground}, ${colors.tertiaryBackground}),
        ${colors.mainGradient45};
      background-origin: border-box;
      background-clip: padding-box, border-box;
    `}
`;

const Week = styled.p`
  font-size: ${fonts.big};
  color: ${colors.lightGrey};
`;

const Date = styled.p`
  font-size: ${fonts.regular};
  color: ${colors.darkGrey};
  margin-top: 1.2rem;
`;

const StyledSupremeLogo = styled(SupremeLogo)<Props>`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;

  ${({ available }) =>
    !available &&
    css`
      path {
        fill: ${colors.darkGrey};
      }
    `}
`;

const StyledPalaceLogo = styled(PalaceLogo)<Props>`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;

  ${({ available }) =>
    !available &&
    css`
      path {
        fill: ${colors.darkGrey};
      }
    `}
`;

const Droplist = (props: Props) => {
  //Redux useSelector
  return (
    <Wrapper {...props}>
      {props.isPalace ? <StyledPalaceLogo {...props} /> : <StyledSupremeLogo {...props} />}
      <Week>Week 20</Week>
      <Date>11th July 19</Date>
    </Wrapper>
  );
};

export default Droplist;
