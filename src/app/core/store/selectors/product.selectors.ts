import { IAppState } from '../state/app.state';
import { IProductState } from '../state/products.state';
import { createSelector } from '@ngrx/store';

const selectProductState = (state: IAppState) => state.product;

export const selectProducts = createSelector(
  selectProductState,
  (state: IProductState) => state.product
);

export const selectProductCount = createSelector(
  selectProductState,
  (state: IProductState) => state.productCount
);

export const selectProductById = (productId: string) => createSelector(
  selectProducts,
  (products) => products.find(product => product.id === productId)
);
