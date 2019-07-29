import React from 'react';
import styled, { keyframes } from 'styled-components';
import InlineLogo from 'components/InlineLogo/InlineLogo';
import { colors } from 'themes/main';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to  {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 13rem;
  z-index: 10;
  -webkit-app-region: drag;
`;

const SpinnerWrapper = styled.div`
  opacity: 0;
  animation: ${fadeIn} 2s forwards;
`;

const loading = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${loading} 1s infinite linear;
  background: ${colors.pink};
  background: linear-gradient(to right, ${colors.pink} 10%, rgba(255, 255, 255, 0) 42%);
  border-radius: 50%;

  height: 5em;
  margin-top: 25rem;
  position: relative;
  width: 5em;

  &:before {
    background: ${colors.pink};
    border-radius: 100% 0 0 0;
    content: '';
    position: absolute;
    height: 50%;
    width: 50%;
    top: 0;
    left: 0;
  }

  &:after {
    content: '';
    background: ${colors.primaryBackground};
    position: absolute;
    height: 75%;
    width: 75%;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Loader = () => {
  return (
    <Wrapper>
      <InlineLogo />
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    </Wrapper>
  );
};

export default Loader;
