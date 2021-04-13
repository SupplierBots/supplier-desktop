import { createAction } from '@reduxjs/toolkit';
import { firestore } from 'firebase/config';
import { Product } from 'main/types/Product';
import { StateObservable } from 'redux-observable';
import { collectionData } from 'rxfire/firestore';
import { of } from 'rxjs';
import { filter, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { userLoggedOut } from 'store/auth/authSlice';
import { RootState, StoreObservable } from 'store/root';
import { addProducts } from './productsSlice';

export const fetchProducts = createAction('products/fetch');

const productsRef = firestore.collection('products');

export const fetchProductsEpic = (action$: StoreObservable, state$: StateObservable<RootState>) =>
  action$.pipe(
    filter(fetchProducts.match),
    switchMap(() =>
      collectionData<Product>(productsRef).pipe(
        takeUntil(action$.pipe(filter(userLoggedOut.match))),
        mergeMap(newProducts => {
          const currentTasksProducts = state$.value.tasks.map(t => t.product!.value);

          const productsInUse = Object.values(state$.value.products).filter(p =>
            currentTasksProducts.includes(p.name),
          );

          const allProducts = [...productsInUse, ...newProducts];
          return of(addProducts({ products: allProducts }));
        }),
      ),
    ),
  );
