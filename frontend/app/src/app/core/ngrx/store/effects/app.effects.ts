import { AppState } from './../state/app.state';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, mergeMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AppActions from '@app/ngrx/store/actions/app.actions';
@Injectable()
export class AppEffects {

  theme$ = createEffect(
    () => this.actions$.pipe(
      ofType(AppActions.getTheme),
      mergeMap(() => of(localStorage.getItem('theme')).pipe(
        map(theme => AppActions.setTheme({ theme: theme ?? 'light' }))
      ))
    )
  );

  themeSet$ = createEffect(
    () => this.actions$.pipe(
      ofType(AppActions.setTheme),
      tap(action => {

        const body = document.getElementsByTagName('body')[0];
        const primeng = <HTMLLinkElement> document.getElementById('primengTheme');

        if(action.theme === 'light'){
          primeng.href = "/assets/primeng/md-light-indigo/theme.css";
          body.classList.remove('dark-theme');
        }else{
          primeng.href = "/assets/primeng/md-dark-indigo/theme.css";
          body.classList.add('dark-theme');
        }

        localStorage.setItem('theme', action.theme);
      })
    ), { dispatch: false}
  );



  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) { }
}
