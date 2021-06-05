import { SharedModule } from './../../shared/shared.module';
import { AuthEffects } from './store/auth.effects';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AuthRoutingModule } from './auth.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromModule from './store/auth.reducer';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { environment } from '@env';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,

    StoreModule.forFeature(fromModule.featureKey, fromModule.authReducer),
    EffectsModule.forFeature([AuthEffects]),

    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [ `${environment.endpoint}` ],
        sendAccessToken: true,
      }
    }),

    SharedModule,

    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: OAuthStorage,
      useFactory: (): OAuthStorage => localStorage
    }
  ]
})
export class AuthModule { }
