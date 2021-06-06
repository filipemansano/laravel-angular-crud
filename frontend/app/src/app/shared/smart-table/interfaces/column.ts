import { ComponentType } from '@angular/cdk/overlay';
import { Validators } from '@angular/forms';
import { ColumnType } from "./column-type";

export interface Column {
  name: string;
  label?: string;
  valueProp?: string;
  valueLabel?: string;
  visible?: boolean;
  defaultValue?: any;
  type?: ColumnType
  filter?: boolean;
  sort?: boolean;
  editable?: boolean;
  validators?: Validators[],

  // custom column
  component?: ComponentType<any>,
  initComponentData?: any
}
