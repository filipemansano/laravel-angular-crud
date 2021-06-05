import { Action } from '@ngrx/store';
import { EntityAction, DefaultPersistenceResultHandler } from '@ngrx/data';
import { Injectable } from '@angular/core';
@Injectable()
export class AdditionalPersistenceResultHandler extends DefaultPersistenceResultHandler {
  handleSuccess(originalAction: EntityAction): (data: any) => Action {
    const actionHandler = super.handleSuccess(originalAction);
    return (data: any) => {
      const action = actionHandler.call(this, data);
      if (action && data && data.pageInfo) {
        (action as any).payload.pageInfo = data.pageInfo;
        (action as any).payload.data = data.data;
      }
      return action;
    };
  }
}
