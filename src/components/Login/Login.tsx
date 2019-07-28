import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 13rem;
  z-index: 10;
  -webkit-app-region: drag;
`;

const Login = () => {
  return (
    <Wrapper>
      <div>Login page</div>
    </Wrapper>
  );
};

export default Login;
