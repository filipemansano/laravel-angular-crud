import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Plan } from '../model/plan';

import { CustomEntityCollectionServiceBase } from '@app/ngrx/store/entity-collection-service-base';

@Injectable({providedIn: 'root'})
export class PlanEntityService extends CustomEntityCollectionServiceBase<Plan> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Plan', serviceElementsFactory);
  }
}
