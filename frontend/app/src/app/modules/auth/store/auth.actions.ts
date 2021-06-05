import { TokenResponse } from 'angular-oauth2-oidc';
import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] auth/login', props<{ username: string, password: string }>());
export const loginSuccess = createAction('[Auth] auth/login/success', props<{ token: TokenResponse }>());
export const loginFailed = createAction('[Auth] auth/login/failed');

export const logout = createAction('[Auth] auth/logout');

export const clearToken = createAction('[Auth] auth/token/clear');
