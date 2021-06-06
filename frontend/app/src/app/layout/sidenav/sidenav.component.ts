import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { selectTheme } from '@app/ngrx/store/selectors/app.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '@app/ngrx/store/state/app.state';
import { MENU_ITENS } from '@app/data/menu';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {

  public navItens = MENU_ITENS;

  public _destroy$ = new Subject();
  public theme = '';

  constructor(
    private storeRoot: Store<AppState>,
  ) {}

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  ngOnInit(): void {
    this.storeRoot.select(selectTheme).pipe(takeUntil(this._destroy$)).subscribe(theme => this.theme = theme);
  }

}
