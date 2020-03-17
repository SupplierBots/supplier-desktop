import { SliceCaseReducers } from '@reduxjs/toolkit';
import { Product } from 'main/types/Product';
import { createUserDataSlice } from 'store/ createUserDataSlice';

export const productsSlice = createUserDataSlice<Product, SliceCaseReducers<Product[]>>({
  name: 'products',
});

export const {
  add: addProduct,
  update: updateProduct,
  remove: removeProduct,
  removeAll: removeAllProducts,
} = productsSlice.actions;
