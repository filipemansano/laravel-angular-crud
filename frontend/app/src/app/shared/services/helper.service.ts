import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  public getAllParamsFromActiveRoute(activatedRoute: ActivatedRoute) {
    return activatedRoute.pathFromRoot
      .map(r => r.snapshot.params)
      .filter(p => Object.keys(p).length > 0);
  }

}
