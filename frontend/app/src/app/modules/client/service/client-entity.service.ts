import { environment } from '@env';
import { Injectable } from '@angular/core';
import { Client } from '../model/client';
import {
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';

import { CustomEntityCollectionServiceBase } from '@app/ngrx/store/entity-collection-service-base';

export const ENDPOINT = `${environment.endpoint}/api/clients`;

@Injectable({providedIn: 'root'})
export class ClientEntityService extends CustomEntityCollectionServiceBase<Client>  {

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Client', serviceElementsFactory);
  }
}
