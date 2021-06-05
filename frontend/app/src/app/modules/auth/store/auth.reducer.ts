import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { AuthState, initialAuthState } from './auth.state';

const _authReducer = createReducer(

  initialAuthState,

  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
  })),

  on(AuthActions.loginFailed, (state) => ({
    ...state,
    loading: false,
  })),

  on(AuthActions.loginSuccess, (state, { token }) => ({
    ...state,
    loading: false,
    token
  })),

  on(AuthActions.clearToken, (state) => ({
    ...state,
    loading: false,
    token: null
  })),
);

export const featureKey = 'auth';

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
