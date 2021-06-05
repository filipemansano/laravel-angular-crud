import { selectTheme } from '@app/ngrx/store/selectors/app.selectors';
import { AppState } from '@app/ngrx/store/state/app.state';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthState } from '@modules/auth/store/auth.state';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import * as AuthAction from '../../store/auth.actions';
import { selectAuthLoading } from '../../store/auth.selector';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public hidePassword = true;
  public loading = false;
  public loginForm!: FormGroup;

  public _destroy$ = new Subject();
  public theme = '';

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AuthState>,
    private storeRoot: Store<AppState>,
  ) { }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  ngOnInit(): void {

    this.storeRoot.select(selectTheme).pipe(takeUntil(this._destroy$)).subscribe(theme => this.theme = theme);
    this.store.select(selectAuthLoading).pipe(takeUntil(this._destroy$)).subscribe(loading => this.loading = loading);

    this.loginForm = this.formBuilder.group({
      username: ['admin@admin.com', [Validators.required, Validators.email]],
      password: ['password', [Validators.required, Validators.minLength(6)]],
    });
  }

  public login(): void {

    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    if (password && username) {
      this.store.dispatch(AuthAction.login({
        username,
        password,
      }));
    }
  }
}
