import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from '../model/client';
import { map, tap } from 'rxjs/operators';
import { ClientEntityService } from './client-entity.service';

@Injectable({
  providedIn: 'root'
})
export class ClientResolver implements Resolve<Client> {

  constructor(
    private service: ClientEntityService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    return this.service.selectByKey(route.paramMap.get('clientId')).pipe(
      map(r => {
        return {
          label: r.name,
          icon: 'home'
        };
      })
    );
  }
}
