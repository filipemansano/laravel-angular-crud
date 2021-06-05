import { AppInitService } from '@app/services/app-init.service';
import { NgRxModule } from './ngrx/ngrx.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { APP_INITIALIZER, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './guards/module-import.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    NgRxModule,

    MatSnackBarModule,
    HttpClientModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [AppInitService],
      useFactory: (appInit: AppInitService) => () => appInit.loadConfiguration().toPromise(),
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
      throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}

