import { Column } from '@shared/smart-table/interfaces/column';
import { Component, ComponentFactoryResolver, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'smart-table-custom-field',
  template: '',
})
export class CustomFieldComponent implements OnInit {

  @Input() column!: Column;
  @Input() control!: FormControl;

  constructor(
    public viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {

    this.viewContainerRef.clear();

    const componentRef = this.viewContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(<any> this.column.component)
    );

    const instance = <any> componentRef.instance;

    instance.control = this.control;

    if(this.column.initComponentData){
      for(const key in this.column.initComponentData){
        instance[key] = this.column.initComponentData[key];
      }
    }
  }

}
