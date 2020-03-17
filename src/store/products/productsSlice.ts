import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from 'main/types/Product';

export const productsSlice = createSlice({
  name: 'products',
  initialState: [] as Product[],
  reducers: {
    addProduct: (state, { payload }: PayloadAction<{ product: Product }>) => {
      state.push(payload.product);
    },
    updateProduct: (state, { payload }: PayloadAction<{ product: Product }>) => {
      return state.map(p => {
        return p.id === payload.product.id ? payload.product : p;
      });
    },
    deleteProduct: (state, { payload }: PayloadAction<{ id: string }>) => {
      return state.filter(p => p.id !== payload.id);
    },
    deleteAllProducts: () => {
      return [];
    },
  },
});

export const {
  addProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
} = productsSlice.actions;
