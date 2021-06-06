import { EffectsModule } from '@ngrx/effects';
import { ClientEffects } from './store/effects/client.effetcts';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AssociationTableModule } from '@shared/association-table/association-table.module';
import { baseEntityConfig } from './store/state/entity-metadata';
import { EntityDefinitionService } from '@ngrx/data';
import { ClientIndexComponent } from './page/index/index.component';
import { SmartTableModule } from '@shared/smart-table/smart-table.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { PlansComponent } from './page/plans/plans.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    ClientIndexComponent,
    PlansComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SmartTableModule,
    MatButtonModule,
    MatIconModule,
    ConfirmPopupModule,
    AssociationTableModule,
    MatSnackBarModule,

    EffectsModule.forFeature([ClientEffects])
  ]
})
export class ClientModule {
  constructor(
    eds: EntityDefinitionService
  ){
    eds.registerMetadataMap(baseEntityConfig.baseEntityMetadata);
  }
}
