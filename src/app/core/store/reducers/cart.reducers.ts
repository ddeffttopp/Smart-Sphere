import { ICartState, initialCartState } from '../state/cart.state';
import { CartActions, ECartActions } from '../actions/cart.actions';

export const cartReducer = (state = initialCartState, action: CartActions): ICartState => {
  switch (action.type) {

    case ECartActions.AddToCart: {
      const itemExists = state.items.find(item => item.productId === action.payload.productId);
      if (itemExists) {
        return {
          ...state,
          items: state.items.map(item =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }
    }

    case ECartActions.RemoveFromCart: {
      return {
        ...state,
        items: state.items.filter(item => item.productId !== action.productId),
      };
    }

    case ECartActions.ClearCart: {
      return {
        ...state,
        items: []
      };
    }

    default:
      return state;
  }
}
