import { ClientSecret } from './../models/client-secret';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  private dynamicEnv = new Subject<ClientSecret>();

  constructor() { }

  /** Setter for environment variable */
  setEnvironment(data: ClientSecret): void {
    this.dynamicEnv.next(data);
  }
  /** Getter for environment variable */
  get environment(): Observable<ClientSecret> {
    return this.dynamicEnv;
  }
}
