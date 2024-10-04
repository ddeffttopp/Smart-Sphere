import { IProduct } from '../../interfaces/product.interface';

export interface IProductState {
  product: IProduct[];
  productCount: number | null;
}

export const initialProductState: IProductState = {
  product: [],
  productCount: null,
}
