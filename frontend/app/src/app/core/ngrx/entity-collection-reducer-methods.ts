import { EntityAction, EntityCollection, EntityDefinition, EntityCollectionReducerMethods } from '@ngrx/data';

export class AdditionalEntityCollectionReducerMethods<T> extends EntityCollectionReducerMethods<T> {
  constructor(public entityName: string, public definition: EntityDefinition<T>) {
    super(entityName, definition);
  }
   protected queryManySuccess(
    collection: EntityCollection<T>,
    action: EntityAction<T[]>
  ): EntityCollection<T> {
    const ec = super.queryManySuccess(collection, action);
    if ((action.payload as any).pageInfo) {
      (ec as any).pageInfo = (action.payload as any).pageInfo;
    }
    return ec;
  }
}
