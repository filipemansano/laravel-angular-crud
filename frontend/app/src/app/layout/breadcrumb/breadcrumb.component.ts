import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  readonly home = {icon: 'pi pi-home', url: '/#/'};

  public menuItems: MenuItem[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {

    this.setBreadcrumb();

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => this.setBreadcrumb());
  }

  private setBreadcrumb(){
    this.menuItems = this.createBreadcrumbs(this.activatedRoute.root);
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '#', breadcrumbs: MenuItem[] = []): any {

    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {

      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const breadcrumb = child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_BREADCRUMB];

      if (breadcrumb && (breadcrumbs.length === 0 || breadcrumbs[breadcrumbs.length -1].url !== url) ){
        breadcrumbs.push({
          ...breadcrumb,
          url
        });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }

}
