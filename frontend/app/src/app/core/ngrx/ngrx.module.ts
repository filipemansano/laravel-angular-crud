import { DefaultDataServiceConfig, EntityDataModule, HttpUrlGenerator } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '@env';
import { SkipSelf } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { PersistenceResultHandler, EntityCollectionReducerMethodsFactory } from '@ngrx/data';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AdditionalPersistenceResultHandler } from './persistent-result-handler';
import { AdditionalEntityCollectionReducerMethodsFactory } from './entity-collection-reducer-methods-factory';
import { reducers, metaReducers } from './store/reducers/app.reducer';
import { AppEffects } from './store/effects/app.effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { PluralHttpUrlGenerator } from './plural-http-url-generator';
import { throwIfAlreadyLoaded } from '@app/guards/module-import.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    StoreModule.forRoot( reducers, {
      metaReducers
    }),

    EffectsModule.forRoot([ AppEffects ]),
    EntityDataModule.forRoot({}),

    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),

    // Connects RouterModule with StoreModule, uses MinimalRouterStateSerializer by default
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal,
    }),
  ],
  providers: [
    {
      provide: PersistenceResultHandler,
      useClass: AdditionalPersistenceResultHandler
    },
    {
      provide: EntityCollectionReducerMethodsFactory,
      useClass: AdditionalEntityCollectionReducerMethodsFactory
    },
    {
      provide: HttpUrlGenerator,
      useClass: PluralHttpUrlGenerator
    },
    {
      provide: DefaultDataServiceConfig,
      useValue: {
        root: `${environment.endpoint}`
      }
    }
  ]
})
export class NgRxModule {
  constructor(@Optional() @SkipSelf() parentModule: NgRxModule) {
      throwIfAlreadyLoaded(parentModule, 'NgRxModule');
  }
}
