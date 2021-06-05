import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectFeature = createFeatureSelector<AuthState>('auth');

export const selectAuthLoading = createSelector(
  selectFeature,
  (state: AuthState) => state.loading
);

export const selectAuthToken = createSelector(
  selectFeature,
  (state: AuthState) => state.token
);
