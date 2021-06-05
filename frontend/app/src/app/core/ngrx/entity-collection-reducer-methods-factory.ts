import { Injectable } from '@angular/core';
import { EntityDefinitionService, EntityCollectionReducerMethodMap } from '@ngrx/data';
import { AdditionalEntityCollectionReducerMethods } from './entity-collection-reducer-methods';

@Injectable()
export class AdditionalEntityCollectionReducerMethodsFactory {
  constructor(private entityDefinitionService: EntityDefinitionService) { }
  create<T>(entityName: string): EntityCollectionReducerMethodMap<T> {
    const definition = this.entityDefinitionService.getDefinition<T>(entityName);
    const methodsClass = new AdditionalEntityCollectionReducerMethods(entityName, definition);
    return methodsClass.methods;
  }
}
