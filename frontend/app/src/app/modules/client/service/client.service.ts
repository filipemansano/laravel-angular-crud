import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClientService {

  constructor(
    private http: HttpClient
  ) { }

  public syncPlans(clientId: number, plans: number[]) {
    return this.http.put(`${environment.endpoint}/clients/${clientId}/plans/sync`, {
      plans
    });
  }
}
