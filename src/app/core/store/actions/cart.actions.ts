import { Action } from '@ngrx/store';
import { ICartItem } from '../state/cart.state';

export enum ECartActions {
  AddToCart = '[Cart] Add To Cart',
  RemoveFromCart = '[Cart] Remove From Cart',
  ClearCart = '[Cart] Clear Cart',
}

export class AddToCart implements Action {
  public readonly type = ECartActions.AddToCart;

  constructor(public payload: ICartItem) {
  }
}

export class RemoveFromCart implements Action {
  public readonly type = ECartActions.RemoveFromCart;

  constructor(public productId: number) {
  }
}

export class ClearCart implements Action {
  public readonly type = ECartActions.ClearCart;
}

export type CartActions =
  AddToCart
  | RemoveFromCart
  | ClearCart;
