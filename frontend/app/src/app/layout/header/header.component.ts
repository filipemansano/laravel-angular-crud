import { NavService } from '@app/services/nav.service';
import { selectNotification } from './../../core/ngrx/store/selectors/app.selectors';
import { selectTheme } from '@app/ngrx/store/selectors/app.selectors';
import { AppState } from '@app/ngrx/store/state/app.state';
import { Store } from '@ngrx/store';
import { AuthenticationService } from '@modules/auth/services/authetication.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthState } from '@modules/auth/store/auth.state';
import { setTheme } from '@app/ngrx/store/actions/app.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() isHandset!: string;

  private _destroy$ = new Subject();
  public theme!: string;
  public notifications: any[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private navService: NavService,
    private storeAuth: Store<AuthState>,
    private storeRoot: Store<AppState>,
  ) {}

  ngOnDestroy(): void{
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  ngOnInit(): void {
    this.storeRoot.select( selectTheme ).pipe(takeUntil(this._destroy$)).subscribe( theme => this.theme = theme);
    this.storeRoot.select( selectNotification ).pipe(takeUntil(this._destroy$)).subscribe( notifications => this.notifications = notifications);
  }

  public toggleSideNav(): void {
    this.navService.toggleSideNav();
    this.isHandset = this.navService.navOpened.getValue() ? 'side' : 'over';
  }

  public logout(): void {
    this.authenticationService.logout();
  }

  public switchTheme(){
    this.storeRoot.dispatch( setTheme({ theme: this.theme === 'dark' ? 'light' : 'dark'}) )
  }

}
