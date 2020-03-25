import React from 'react';
import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme/main';
import { ReactComponent as SupremeLogo } from 'assets/SupremeLogo.svg';
import { ReactComponent as PalaceLogo } from 'assets/PalaceLogo.svg';
import { Droplist as DroplistType } from 'store/dashboard/dashboardSlice';
import { shell } from 'electron';

interface Props {
  'data-available'?: boolean;
  isPalace?: boolean;
  details: DroplistType;
}

const Wrapper = styled.div<Props>`
  height: 8rem;
  width: 15.5rem;
  border-radius: 0.5rem;
  background: ${colors.tertiaryBackground};
  color: ${colors.darkGrey};
  border: 1px solid ${colors.darkGrey};
  padding: 0.8rem 1.5rem;
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

  ${({ 'data-available': available }) =>
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
  margin-top: 1.03rem;

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
  top: 1.65rem;
  left: 2rem;

  ${({ 'data-available': available }) =>
    !available &&
    css`
      path {
        fill: ${colors.darkGrey};
      }
    `}
`;

const StyledPalaceLogo = styled(PalaceLogo)<Props>`
  position: absolute;
  top: 1.65rem;
  left: 2rem;

  ${({ 'data-available': available }) =>
    !available &&
    css`
      path {
        fill: ${colors.darkGrey};
      }
    `}
`;

const Droplist = (props: Props) => {
  const { isPalace, ...rest } = props;
  return (
    <Wrapper {...rest} onClick={() => shell.openExternal(props.details.link)}>
      {isPalace ? <StyledPalaceLogo {...rest} /> : <StyledSupremeLogo {...rest} />}
      <Week>Week {props.details.week}</Week>
      <Date>{props.details.date}</Date>
    </Wrapper>
  );
};

export default Droplist;
