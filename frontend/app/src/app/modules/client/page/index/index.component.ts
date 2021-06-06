import { Action } from '@shared/smart-table/interfaces/action';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientEntityService } from '../../service/client-entity.service';
import { Component, OnInit } from '@angular/core';
import { Column } from '@shared/smart-table/interfaces/column';
import { ColumnType } from '@shared/smart-table/interfaces/column-type';
import { Validators } from '@angular/forms';

@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class ClientIndexComponent implements OnInit {

  public columns: Column[] = [];
  public actions:Action[] = [];

  constructor(
    public service: ClientEntityService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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
        name: 'phone',
        label: 'Telefone',
        sort: true,
        filter: true,
        type: ColumnType.INPUT,
        validators: [Validators.required]
      },
      {
        name: 'state',
        label: 'Estado',
        sort: false,
        filter: false,
        editable: false,
      },
      {
        name: 'city_id',
        valueProp: 'city.id',
        valueLabel: 'city.name',
        label: 'Cidade',
        sort: false,
        filter: false,
        type: ColumnType.CITY,
        validators: [Validators.required]
      },
      {
        name: 'birth_day',
        label: 'Data de nasc.',
        sort: true,
        filter: true,
        type: ColumnType.INPUT,
        validators: [Validators.required]
      },
      {
        name: 'email',
        label: 'Email',
        sort: true,
        filter: true,
        type: ColumnType.INPUT,
        validators: [Validators.required, Validators.email]
      },
    ];

    this.actions = [
      {
        label: 'Gerenciar Planos',
        callback: (id:number) => this.plans(id)
      }
    ]
  }

  plans(id:number){
    this.router.navigate([id, 'plans'], { relativeTo: this.activatedRoute.parent });
  }

}
