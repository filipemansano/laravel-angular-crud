import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssociationTableComponent } from './association-table.component';
import { PickListModule } from 'primeng/picklist';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AssociationTableComponent
  ],
  exports:[
    AssociationTableComponent
  ],
  imports: [
    CommonModule,
    PickListModule,
    MatProgressSpinnerModule
  ]
})
export class AssociationTableModule { }
