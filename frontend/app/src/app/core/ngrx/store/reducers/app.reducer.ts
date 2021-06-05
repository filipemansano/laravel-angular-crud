
import { AppState, initialAppState } from '@app/ngrx/store/state/app.state';
import { Action, ActionReducer, createReducer, MetaReducer, on } from '@ngrx/store';

import * as AppActions from '../actions/app.actions';
import { logout } from '@modules/auth/store/auth.actions';
import { routerReducer } from '@ngrx/router-store';


export const reducers = {
  router: routerReducer,
  app: (state: AppState | undefined, action: Action) => appReducer(state, action)
}

export const metaReducers: MetaReducer<any>[] = [
  clearStateMetaReducer
];

export function clearStateMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {

  return function (state, action) {

    if (action.type === logout.type) {

      const initialAppStateReset = {
        app: {
          ...initialAppState,
          theme: state.app.theme
        }
      }

      state = initialAppStateReset;
    }

    return reducer(state, action);
  };
}

const appReducer = createReducer(

  initialAppState,

  on(AppActions.setTheme, (state, { theme }) => ({
    ...state,
    theme: theme
  })),
);
