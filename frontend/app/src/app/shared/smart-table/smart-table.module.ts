import { MatMenuModule } from '@angular/material/menu';
import { ConfirmationService } from 'primeng/api';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartTableComponent } from './smart-table.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { CustomFieldComponent } from './components/custom-field/custom-field.component';
@NgModule({
  declarations: [
    SmartTableComponent,
    InputFieldComponent,
    CustomFieldComponent
  ],
  exports: [
    SmartTableComponent
  ],
  providers: [
    ConfirmationService
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatSnackBarModule,

    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    MatSnackBarModule,

    TableModule,
    ButtonModule,
    InputTextModule,
    ConfirmPopupModule
  ]
})
export class SmartTableModule { }
