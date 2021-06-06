import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'client'
      },
      {
        path: 'client',
        canActivate: [ AuthGuard ],
        data: {
          breadcrumb: {
            label: 'Client',
            icon: 'home'
          }
        },
        loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
