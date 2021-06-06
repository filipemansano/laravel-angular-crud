import { selectAuthToken } from './../store/auth.selector';
import { AuthState } from '@modules/auth/store/auth.state';
import { Store } from '@ngrx/store';
import { AuthenticationService } from './../services/authetication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store<AuthState>
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthenticate();
  }

  private checkAuthenticate(): Observable<boolean> {
    return this.store.select(selectAuthToken).pipe(
      take(1),
      map(token => !!token),
      tap(token => {
        if (!token) {
          this.authenticationService.redirectToLogin();
        }
      }));
  }
}
