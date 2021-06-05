import { ClientSecret } from '@app/models/client-secret';
import { selectAuthToken } from './../store/auth.selector';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { OAuthService, TokenResponse } from 'angular-oauth2-oidc';
import { environment } from '@env';
import { AuthState } from '../store/auth.state';
import { Store } from '@ngrx/store';

import * as AuthAction from '../store/auth.actions';
import { distinctUntilChanged, take } from 'rxjs/operators';
import { EnvironmentService } from '@app/services/environment.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private environmentService: EnvironmentService,
    private oauthService: OAuthService,
    private route: Router,
    private store: Store<AuthState>
  ) {

    this.environmentService.environment.pipe(
      take(1),
    ).subscribe( dynamicEnv => {
      this.init(dynamicEnv);
    });
  }

  private init(dynamicEnv: ClientSecret): void {

    this.oauthService.configure({
      oidc: false,
      requireHttps: environment.production,
      clientId: dynamicEnv.id.toString(),
      dummyClientSecret: dynamicEnv.secret,
      tokenEndpoint: `${environment.endpoint}/oauth/token`,
      scope: '*',
    });

    // set in the store token recorded in local storage
    if (this.oauthService.hasValidAccessToken()) {

      this.store.dispatch(AuthAction.loginSuccess({
        token: {
          access_token: this.oauthService.getAccessToken(),
          refresh_token: this.oauthService.getRefreshToken(),
          expires_in: this.oauthService.getAccessTokenExpiration(),
          token_type: 'Bearer',
          id_token: '',
          scope: '*'
        }
      }));
    }

    this.store.select(selectAuthToken).pipe(
      distinctUntilChanged()
    ).subscribe(token => {

      if (!token) {
        this.redirectToLogin();
      }else{
        this.redirectToHome();
      }

    });
  }

  public login(username: string, password: string): Promise<TokenResponse> {
    return this.oauthService.fetchTokenUsingPasswordFlow(username, password);
  }

  public logout(): void {
    this.oauthService.logOut();
    this.store.dispatch(AuthAction.logout());
  }

  public redirectToLogin(): void {
    this.route.navigateByUrl('/auth');
  }

  public redirectToHome(): void {
    this.route.navigateByUrl('/');
  }
}
