import { Injectable } from '@angular/core';
import { Filter } from '@shared/smart-table/interfaces/filter';
import { FilterMetadata } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  public getQuery(filters?: Filter, traceKey?: string) {

    const params: any = {};

    if (filters !== undefined) {

      if (filters.first && filters.rows) {

        let first = filters.first;
        let rows = filters.rows;

        if (typeof first === 'string') {
          first = parseInt(first, 10);
        }

        if (typeof rows === 'string') {
          rows = parseInt(rows, 10);
        }

        params['page'] = first === 0 ? 1 : Math.ceil((first + 1) / rows);
      }

      if (filters.rows) {
        params['limit'] = filters.rows;
      }

      if (filters.sortField) {
        params['sort'] = filters.sortField;
        params['sort-direction'] = filters.sortOrder ?? 1;
      }

      if (filters.filters) {

        const fields: any = {};

        // tslint:disable-next-line: forin
        for (const field in filters.filters) {

          (<FilterMetadata[]> filters.filters[field]).filter(v => !!v.value).forEach((data) => {

            const matchMode = <string> data.matchMode;

            if (!fields[field]) {
              fields[field] = {
                rules: {},
                operator: data.operator ?? 'or'
              };
            }

            if (!fields[field]['rules'][matchMode]) {
              fields[field]['rules'][matchMode] = [];
            }

            fields[field]['rules'][matchMode].push(data.value);
          });
        }

        // tslint:disable-next-line: forin
        for (const field in fields) {
          params[`filter[${field}][operator]`] = fields[field]['operator'];
          // tslint:disable-next-line: forin
          for (const rule in fields[field]['rules']) {
            params[`filter[${field}][rules][${rule}][]`] = fields[field]['rules'][rule];
          }
        }
      }
    }

    if (traceKey) {
      params['traceKey'] = traceKey;
    }

    return params;
  }
}
