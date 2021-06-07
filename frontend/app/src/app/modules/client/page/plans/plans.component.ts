import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { combineLatest } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from '@shared/services/helper.service';
import { Plan } from './../../model/plan';
import { PlanEntityService } from './../../service/plan-entity.service';
import { Component, OnInit } from '@angular/core';
import { ClientEntityService } from '@modules/client/service/client-entity.service';

import * as ClientActions from '../../store/actions/client.actions';

interface Itens {
  id: number;
  label: string;
  name: string;
}

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {

  private clientId!: number;

  public plans: { avaliables: Itens[], selecteds: Itens[] } | null = null;

  constructor(
    private router: ActivatedRoute,
    private planEntityService: PlanEntityService,
    private helperService: HelperService,
    private clientEntityService: ClientEntityService,
    private confirmationService: ConfirmationService,
    private store: Store,
    private actions$: Actions,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {


    const params = this.helperService.getAllParamsFromActiveRoute(this.router);

    const client = params.filter(p => p.hasOwnProperty('clientId')).shift();

    if (client === undefined) {
      throw new Error('clientId not set in param');
    }

    this.clientId = client.clientId;

    combineLatest([this.planEntityService.getAll(), this.clientEntityService.selectByKey(this.clientId)]).pipe(
      map(([plans, client]) => {
        const selectedsIds = client.plans.map(x => x.id);
        const filter = (x: Plan) => {
          return { id: x.id, label: `${x.name} (R$ ${x.monthly_payment})`, name: x.name };
        };

        this.plans = {
          avaliables: plans.filter(x => !selectedsIds.includes(x.id)).map(x => filter(x)),
          selecteds: client.plans.map(x => filter(x))
        };
      }),
      take(1)
    ).subscribe();
  }

  save(event: Event) {

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Tem certeza que deseja atualizar os planos?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {

        if (this.plans === null) {
          throw new Error('Plans not laoded');
        }

        this.store.dispatch(ClientActions.syncPlans({
          clientId: this.clientId,
          plans: this.plans.selecteds.map(x => x.id)
        }));

        this.actions$.pipe(
          ofType(ClientActions.plansSyncSuccess),
          take(1)
        ).subscribe(() => {
          // update client entity in cache
          this.clientEntityService.getByKey(this.clientId);

          this.snackBar.open('Planos atualizados', 'OK', {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            duration: 3000
          });
        });
      }
    });


  }
}
