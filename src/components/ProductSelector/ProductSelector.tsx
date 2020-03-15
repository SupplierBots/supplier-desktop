import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import Item from 'components/Item/Item';
import { colors, fonts } from 'theme/main';
import { useSelector } from 'hooks/useSelector';
import { Product } from 'main/types/Product';
import { fadeIn } from 'theme/animations';

const StickyBottomBorder = styled.div`
  position: sticky;
  bottom: -0.1rem;
  left: 0;
  width: 100%;
  height: 3.6rem;
  background: ${colors.tertiaryBackground};
`;
const Title = styled.p`
  font-size: ${fonts.big};
  margin-bottom: 1.3rem;
`;

const Wrapper = styled.div<{ error: boolean }>`
  width: 29.5rem;
  height: 40.15rem;
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
  site: string | null;
  value: Product[];
  error: boolean;
  onChange: (name: string, products: Product[]) => void;
  setTouched: (name: string, value: boolean) => void;
  placeholder: string;
}
const ProductSelector = ({ site, value, onChange, setTouched, error }: Props) => {
  const isInitialMount = useRef(true);
  const products = useSelector(state =>
    state.userData.products.filter(prod => prod.site && prod.site.label === site),
  );
  const [selectedProducts, setSelectedProducts] = useState<Product[]>(value);

  useEffect(() => {
    onChange('products', selectedProducts);
  }, [onChange, selectedProducts]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setSelectedProducts([]);
    }
  }, [site]);

  const handleClick = (product: Product) => {
    setTouched('products', true);
    if (selectedProducts.includes(product)) {
      setSelectedProducts(selectedProducts.filter(selectedProd => selectedProd.id !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  return (
    <Wrapper error={error}>
      <Title>Products</Title>
      {products.map(product => (
        <Item
          active={selectedProducts.includes(product)}
          key={product.id}
          name={product.name}
          onClick={() => handleClick(product)}
          animation={fadeIn}
        />
      ))}

      <StickyBottomBorder />
    </Wrapper>
  );
};

export default ProductSelector;
