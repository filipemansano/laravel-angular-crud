import { map } from 'rxjs/operators';
import { ApiResponse } from '@app/models/api-response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { Injectable } from '@angular/core';
import { City } from '../model/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {


  constructor(
    private http: HttpClient
  ) { }

  public search(term: string): Observable<City[]> {

    const query = `filter[name][operator]=or&filter[name][rules][contains][]=${term}`;

    return this.http.get<ApiResponse<City[]>>(`${environment.endpoint}/cities?${query}`).pipe(
      map(cities => cities.data)
    );
  }
}
