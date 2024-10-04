import { initialUserState } from '../state/user.state';
import { EUserActions, UserActions } from '../actions/user.actions';
import { jwtDecode } from 'jwt-decode';

export const userReducers = (state = initialUserState, action: UserActions): any => {
  switch (action.type) {
    case EUserActions.LoginUserSuccess: {
      const userData = jwtDecode(action.token) as any;
      localStorage.setItem('authToken', action.token)
      return {
        ...state,
        id: userData.id,
        name: userData.username,
        email: userData.email,
        role: userData.role
      }
    }
    case EUserActions.RegisterUserSuccess: {
      const userData = jwtDecode(action.token) as any;
      localStorage.setItem('authToken', action.token)
      return {
        ...state,
        id: userData.id,
        name: userData.username,
        email: userData.email,
        role: userData.role
      }
    }
    case EUserActions.RestoreUser: {
      const userToken = localStorage.getItem('authToken');

      if (userToken) {
        const userData = jwtDecode(userToken) as any;
        return {
          ...state,
          id: userData.id,
          name: userData.username,
          email: userData.email,
          role: userData.role
        }
      }

      return state;
    }
    case EUserActions.SignOutUser: {
      return initialUserState;
    }
    default :
      return state;
  }
}
