import { FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'smart-table-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent implements OnInit {

  @Input() control!: FormControl;
  @Input() value: any = undefined;

  constructor() { }

  ngOnInit(): void {

    if(this.value !== undefined){
      this.control.setValue(this.value);
    }
  }

}
