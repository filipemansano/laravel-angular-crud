import { ClientSecret } from './../models/client-secret';
import { ApiResponse } from './../models/api-response';
import { environment } from '@env';
import { EnvironmentService } from './environment.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService
  ) { }

  /**
   * Method for loading configuration
   */
  loadConfiguration(): Observable<any> {

    // TODO: usar redux

    return this.http.get<ApiResponse<ClientSecret>>(`${environment.endpoint}/oauth/client-secret`).pipe(
      map(response => {
        this.environmentService.setEnvironment(response.data);
      }));
  }
}
