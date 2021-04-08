import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from 'main/types/Product';
import { ProductsState } from 'main/types/ProductsState';

const initialState: ProductsState = {};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProducts: (s, { payload }: PayloadAction<{ products: Product[] }>) => {
      const products: ProductsState = {};
      payload.products.forEach(p => {
        products[p.name] = p;
      });
      return products;
    },
  },
});

export const { addProducts } = productsSlice.actions;
