import { Action } from '@ngrx/store';

export enum EUserActions {
  LoginUser = "[User] Login User",
  LoginUserSuccess = "[User] Login User Success",
  RegisterUser = "[User] Register User",
  RegisterUserSuccess = "[User] Register Success",
  RestoreUser = "[User] Restore User",
  SignOutUser = "[User] SignOut User",
}

export class LoginUser implements Action {
  public readonly type = EUserActions.LoginUser;

  constructor(
    public email: string,
    public password: string,
  ) {
  }
}

export class LoginUserSuccess implements Action {
  public readonly type = EUserActions.LoginUserSuccess;

  constructor(
    public token: string
  ) {
  }
}

export class RegisterUser implements Action {
  public readonly type = EUserActions.RegisterUser;

  constructor(
    public username: string,
    public email: string,
    public password: string,
  ) {
  }
}

export class RegisterUserSuccess implements Action {
  public readonly type = EUserActions.RegisterUserSuccess;

  constructor(
    public token: string
  ) {
  }
}

export class RestoreUser implements Action {
  public readonly type = EUserActions.RestoreUser;
}

export class SignOutUser implements Action {
  public readonly type = EUserActions.SignOutUser;
}

export type UserActions =
  LoginUser
  | LoginUserSuccess
  | RegisterUser
  | RegisterUserSuccess
  | RestoreUser
  | SignOutUser;
