import { ButtonLoaderDirective } from './directives/button-loader.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ButtonLoaderDirective
  ],
  exports: [
    ButtonLoaderDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
