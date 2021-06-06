import { ClientService } from './../../service/client.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as ClientActions from '../actions/client.actions';

@Injectable()
export class ClientEffects {

  syncPermission$ = createEffect(
    () => this.actions$.pipe(
      ofType(ClientActions.syncPlans),
      exhaustMap(action => this.clientService.syncPlans(action.clientId, action.plans).pipe(
        map(() => {
          return ClientActions.plansSyncSuccess();
        }),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private clientService: ClientService,
    private store: Store,
  ) { }
}
