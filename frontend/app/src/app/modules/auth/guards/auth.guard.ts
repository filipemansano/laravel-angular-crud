import { AuthenticationService } from './../services/authetication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthenticate();
  }

  private checkAuthenticate(): Observable<boolean> {
    return this.authenticationService.isAuthenticated$.pipe(
      take(1),
      tap(response => {
        if (!response) {
          this.authenticationService.redirectToLogin();
        }
      }));
  }
}
