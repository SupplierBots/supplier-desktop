import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';
import { colors, fonts } from 'themes/main';

const Wrapper = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 0.2rem;
  margin-bottom: 1.3rem;
  :nth-child(1) {
    margin-right: 7rem;
  }
`;

const Label = styled.span`
  font-size: ${fonts.regular};
  margin-left: 1rem;
`;

const HiddenField = styled(Field)`
  display: none;
`;

const CustomSlider = styled.div<{ checked: boolean }>`
  position: relative;
  height: 1.4rem;
  width: 2.8rem;
  border-radius: 0.8rem;
  background: ${({ checked }) => (checked ? colors.mainGradient45 : colors.darkGrey)};

  ::before {
    border-radius: 50%;
    position: absolute;
    content: '';
    height: 1rem;
    width: 1rem;
    top: 0.2rem;
    left: 0.2rem;
    transition: 0.4s;
    background-color: ${colors.lightGrey};
    transform: ${({ checked }) => (checked ? 'translateX(1.3rem)' : 'translateX(0)')};
  }
`;

interface Props {
  label: string;
  name: string;
  checked: boolean;
}

const Slider = (props: Props) => (
  <Wrapper>
    <HiddenField {...props} name={props.name} type="checkbox" />
    <CustomSlider checked={props.checked} />
    <Label>{props.label}</Label>
  </Wrapper>
);

export default Slider;
