import { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to  {
    opacity: 1;
  }
`;

export const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(-1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(18rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const slideInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-1.5rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;
