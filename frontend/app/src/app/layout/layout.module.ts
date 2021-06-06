import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule as CdkLayoutModule} from '@angular/cdk/layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    HeaderComponent,
    SidenavComponent,
    MenuItemComponent,
    MainLayoutComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    BreadcrumbModule,

    CdkLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatBadgeModule,
    MatMenuModule,
  ]
})
export class LayoutModule { }
