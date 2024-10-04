import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { userReducers } from './user.reducers';
import { productReducers } from './product.reducers';

export const appReducer: ActionReducerMap<IAppState, any> = {
  user: userReducers,
  product: productReducers
}
