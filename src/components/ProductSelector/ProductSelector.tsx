import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import Item from 'components/Item/Item';
import { colors, fonts } from 'theme/main';
import { fadeIn } from 'theme/animations';
import { useStateSelector } from 'hooks/typedReduxHooks';

const StickyBottomBorder = styled.div`
  position: sticky;
  bottom: -0.1rem;
  left: 0;
  width: 100%;
  height: 3rem;
  background: ${colors.tertiaryBackground};
`;
const Title = styled.p`
  font-size: ${fonts.big};
  margin-bottom: 1.3rem;
`;

const Wrapper = styled.div<{ error: boolean }>`
  width: 29.5rem;
  height: 30.15rem;
  border-radius: 0.5rem;
  background-color: ${colors.tertiaryBackground};
  padding: 1.5rem 3.6rem 0 3.6rem;
  overflow-y: auto;
  border: double 1px transparent;

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

interface Props {
  value: string[];
  error: boolean;
  onChange: (name: string, products: string[]) => void;
  setTouched: (name: string, value: boolean) => void;
  placeholder: string;
}
const ProductSelector = ({ value, onChange, setTouched, error }: Props) => {
  const isInitialMount = useRef(true);

  const products = useStateSelector(state => state.products);

  const [selectedProducts, setSelectedProducts] = useState<string[]>(value);

  useEffect(() => {
    onChange('products', selectedProducts);
  }, [onChange, selectedProducts]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setSelectedProducts([]);
    }
  }, []);

  const handleClick = (productID: string) => {
    setTouched('products', true);
    if (selectedProducts.includes(productID)) {
      setSelectedProducts(selectedProducts.filter(selectedID => selectedID !== productID));
    } else {
      setSelectedProducts([productID]);
    }
  };

  return (
    <Wrapper error={error}>
      <Title>Products</Title>
      {products.map(product => (
        <Item
          active={selectedProducts.includes(product.id)}
          key={product.id}
          name={product.name}
          onClick={() => handleClick(product.id)}
          animation={fadeIn}
        />
      ))}

      <StickyBottomBorder />
    </Wrapper>
  );
};

export default ProductSelector;
