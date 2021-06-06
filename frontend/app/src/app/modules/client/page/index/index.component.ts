import { ClientEntityService } from '../../service/client-entity.service';
import { Component, OnInit } from '@angular/core';
import { Column } from '@shared/smart-table/interfaces/column';
import { ColumnType } from '@shared/smart-table/interfaces/column-type';
import { Validators } from '@angular/forms';
import { Action } from '@shared/smart-table/interfaces/action';

@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class ClientIndexComponent implements OnInit {

  public columns: Column[] = [];
  public actions: Action[] = [];

  constructor(
    public service: ClientEntityService
  ) { }

  ngOnInit(): void {

    this.columns = [
      {
        name: 'name',
        label: 'Nome',
        sort: true,
        filter: true,
        type: ColumnType.INPUT,
        validators: [Validators.required, Validators.minLength(3)]
      },
      {
        name: 'label',
        label: 'Label',
        sort: true,
        filter: true,
        type: ColumnType.INPUT
      }
    ];
  }

}
