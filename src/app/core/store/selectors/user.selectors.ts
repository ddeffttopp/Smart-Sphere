import { IAppState } from '../state/app.state';
import { createSelector } from '@ngrx/store';
import { IUserState } from '../state/user.state';

const userState = (state: IAppState) => state.user;

export const isUserLogin = createSelector(
  userState,
  (state: IUserState) => !!state.id
);

export const userInfo = createSelector(
  userState,
  (state: IUserState) => state
)
