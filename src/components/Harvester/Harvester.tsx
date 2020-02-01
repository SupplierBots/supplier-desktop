import React from 'react';
import styled from 'styled-components';
import { colors, fonts } from 'theme/main';
import Button from 'components/Button/Button';
import { ReactComponent as RemoveIcon } from 'assets/Remove.svg';

const Wrapper = styled.div`
  height: 7rem;
  width: 100%;
  background-color: ${colors.tertiaryBackground};
  display: flex;
  justify-content: space-between;
  align-items: center;
  :not(:last-of-type) {
    margin-bottom: 1rem;
  }

  div {
    align-self: stretch;
    background: ${colors.mainGradientTB};
    width: 0.2rem;
    margin-right: 3.5rem;
  }
`;

const StyledRemoveIcon = styled(RemoveIcon)`
  margin: 0 3rem;
  width: 1.6rem;
  transition: all 0.3s;
  path {
    fill: url(#iconGradient);
  }

  :hover {
    color: ${colors.lightGrey};
    cursor: pointer;
    transform: scale(1.1);
    path {
      fill: ${colors.lightGrey};
    }
  }
`;
const Name = styled.p`
  font-size: ${fonts.regular};
  color: ${colors.lightGrey};
  margin-right: auto;
`;

const Harvester = () => {
  return (
    <Wrapper>
      <div />
      <Name>Captcha Harvester 1</Name>
      <Button secondary small bgColor={colors.tertiaryBackground}>
        Open To Login
      </Button>
      <StyledRemoveIcon />
    </Wrapper>
  );
};

export default Harvester;
