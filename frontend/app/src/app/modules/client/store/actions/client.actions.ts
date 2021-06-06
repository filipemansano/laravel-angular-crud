import { createAction, props } from '@ngrx/store';

export const syncPlans = createAction('[Client] client/sync/plans', props<{ clientId: number, plans: number[] }>());
export const plansSyncSuccess = createAction('[Client] client/sync/plans/success');
export const plansSyncFailed = createAction('[Client] client/sync/plans/failed');
