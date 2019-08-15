import React from 'react';
import styled from 'styled-components';
import InlineLogo from 'components/InlineLogo/InlineLogo';

import { fadeIn } from 'theme/animations';
import Spinner from 'components/Spinner/Spinner';

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

const Loader = () => {
  return (
    <Wrapper>
      <InlineLogo />
      <SpinnerWrapper>
        <Spinner main />
      </SpinnerWrapper>
    </Wrapper>
  );
};

export default Loader;
