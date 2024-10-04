import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EUserActions, LoginUser, LoginUserSuccess, RegisterUser, RegisterUserSuccess } from '../actions/user.actions';
import { catchError, of, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';

@Injectable()
export class UserEffects {
  loginUser = createEffect(() => this.actions$.pipe(
    ofType<LoginUser>(EUserActions.LoginUser),
    switchMap((data) => this.authService.userLog({
      email: data.email,
      password: data.password
    })),
    catchError(err => {
      this.authService.setUserDataValid(false);
      return throwError(err);
    }),
    switchMap((res) => {
      if (res) {
        this.authService.setUserDataValid(true);
        return of(new LoginUserSuccess(res.token));
      }
      return of();
    })
  ))

  registerUser = createEffect(() => this.actions$.pipe(
    ofType<RegisterUser>(EUserActions.RegisterUser),
    switchMap((data) => this.authService.userReg({
      username: data.username,
      email: data.email,
      password: data.password
    })),
    switchMap((res) => of(new RegisterUserSuccess(res.token)))
  ))

  constructor(
    private authService: AuthService,
    private store: Store,
    private actions$: Actions,
  ) {
  }
}
