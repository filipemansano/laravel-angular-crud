import { TokenResponse } from 'angular-oauth2-oidc';

export interface AuthState {
  token: TokenResponse | null,
  loading: boolean;
};

export const initialAuthState: AuthState = {
  token: null,
  loading: false,
}
