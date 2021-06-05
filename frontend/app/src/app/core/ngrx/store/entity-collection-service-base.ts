import { EntityCollectionServiceBase } from "@ngrx/data";
import { Observable, of } from "rxjs";
import { first, map, switchMap, take } from "rxjs/operators";

export abstract class CustomEntityCollectionServiceBase<T> extends EntityCollectionServiceBase<T>  {

  selectByKey(key: any): Observable<T> {
    return this.entityMap$.pipe(
      take(1),
      switchMap(entities => {
        if(!entities || !entities[key]){
          return this.getByKey(key);
        }else{
          return <Observable<T>> of(entities[key])
        }
      })
    );
  }

  selectCacheByKey(key: any): Observable<T> {
    return this.entityMap$.pipe(
      take(1),
      map(entities => <T> entities[key]),
      first()
    );
  }
}
