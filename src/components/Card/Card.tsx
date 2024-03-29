import React, { ReactNode, MouseEvent } from 'react';
import styled from 'styled-components';
import { colors, shadows } from 'theme/main';

const Wrapper = styled.div`
  background-color: ${colors.secondaryBackground};
  position: relative;
  width: 41rem;
  padding: 2.8rem 4.5rem 5rem 4.5rem;
  border-radius: 0.5rem;

  margin-top: 2.4rem;
  box-shadow: ${shadows.primary};
  margin-bottom: auto;
`;

/*
  Card could be one simple element, but overflow-x: hidden with overflow-y: visible is retarded,
  that's why we need additional BottomPolygon
  Read more here: https://stackoverflow.com/questions/6421966/css-overflow-x-visible-and-overflow-y-hidden-causing-scrollbar-issue
*/

const BottomPolygon = styled.div<{ disableBottomPolygon: boolean | undefined }>`
  ${({ disableBottomPolygon }) => disableBottomPolygon && 'display: none'}
  position: absolute;
  bottom: 0;
  right: 0;
  height: 1rem;
  width: 100%;
  background-color: ${colors.secondaryBackground};
  border-radius: 0.5rem;
  overflow: hidden;
  ::after {
    ${({ disableBottomPolygon }) => disableBottomPolygon && 'display: none'}
    content: '';
    position: absolute;
    height: 2px;
    width: 14rem;
    background: ${colors.mainGradientLR};
    bottom: 0;
    right: 0;
    clip-path: polygon(100% 0, 0% 100%, 100% 100%);
  }
`;

interface Props {
  children: ReactNode;
  disableBottomPolygon?: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

const Card = (props: Props) => (
  <Wrapper {...props}>
    {props.children}
    <BottomPolygon disableBottomPolygon={props.disableBottomPolygon} />
  </Wrapper>
);

export default Card;
