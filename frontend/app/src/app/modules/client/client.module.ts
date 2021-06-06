import { baseEntityConfig } from './store/state/entity-metadata';
import { EntityDefinitionService } from '@ngrx/data';
import { ClientIndexComponent } from './page/index/index.component';
import { SmartTableModule } from './../../shared/smart-table/smart-table.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';


@NgModule({
  declarations: [
    ClientIndexComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SmartTableModule
  ]
})
export class ClientModule {
  constructor(
    eds: EntityDefinitionService
  ){
    eds.registerMetadataMap(baseEntityConfig.baseEntityMetadata);
  }
}
