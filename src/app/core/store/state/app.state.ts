import { initialUserState, IUserState } from './user.state';
import { initialProductState, IProductState } from './products.state';

export interface IAppState {
  user: IUserState;
  product: IProductState;
}

export const initialAppState = {
  user: initialUserState,
  product: initialProductState,
}

export function getInitialState(): IAppState {
  return initialAppState;
}
