import { ClientResolver } from './service/client.resolver';
import { PlansComponent } from './page/plans/plans.component';
import { ClientIndexComponent } from './page/index/index.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ClientIndexComponent,
  },
  {
    path: ':clientId/plans',
    component: PlansComponent,
    resolve: {
      breadcrumb: ClientResolver,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
