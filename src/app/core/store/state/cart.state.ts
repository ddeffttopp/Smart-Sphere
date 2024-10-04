export interface ICartItem {
  productId: number;
  quantity: number;
}

export interface ICartState {
  items: ICartItem[];
}

export const initialCartState: ICartState = {
  items: []
}
