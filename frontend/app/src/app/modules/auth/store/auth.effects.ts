import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, from, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { AuthenticationService } from '@modules/auth/services/authetication.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

  login$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(action => from(this.authenticationService.login(action.username, action.password)).pipe(
        map(token => AuthActions.loginSuccess({token})),
        catchError(() => of(AuthActions.loginFailed()))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService
  ) {}
}
