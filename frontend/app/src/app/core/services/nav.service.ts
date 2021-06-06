import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  public navOpened = new BehaviorSubject<boolean>(true);
  public currentUrl = new BehaviorSubject<string>('');

  public navOpened$ = this.navOpened.asObservable();

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  public toggleSideNav(): void {
    this.navOpened.next( !this.navOpened.getValue() );
  }
}
