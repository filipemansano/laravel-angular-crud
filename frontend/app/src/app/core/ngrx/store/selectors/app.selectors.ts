import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';

export const selectFeature = createFeatureSelector<AppState>('app');

export const selectTheme = createSelector(
  selectFeature,
  (state: AppState) => state.theme
);

export const selectNotification = createSelector(
  selectFeature,
  (state: AppState) => state.notifications
);

export const selectRouter = createFeatureSelector<any, fromRouter.RouterReducerState<any>>('router');

export const {
  selectCurrentRoute,   // select the current route
  selectQueryParams,    // select the current route query params
  selectQueryParam,     // factory function to select a query param
  selectRouteParams,    // select the current route params
  selectRouteParam,     // factory function to select a route param
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = fromRouter.getSelectors(selectRouter);

