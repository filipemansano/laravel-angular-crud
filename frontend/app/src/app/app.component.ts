import { AppState } from '@app/ngrx/store/state/app.state';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';

import * as AppActions from '@app/ngrx/store/actions/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private storeRoot: Store<AppState>){
    this.storeRoot.dispatch( AppActions.getTheme() );
  }
}
