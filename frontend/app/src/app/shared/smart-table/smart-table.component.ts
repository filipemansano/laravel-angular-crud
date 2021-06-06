import { PaginatorService } from '@shared/services/paginator.service';
import { Button } from './interfaces/button';
import { Router } from '@angular/router';
import { Action } from './interfaces/action';
import { PageInfo } from './interfaces/pagination-result';
import { Filter } from '@shared/smart-table/interfaces/filter';
import { Observable, Subject } from 'rxjs';
import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Column } from './interfaces/column';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { FilterMetadata } from 'primeng/api/filtermetadata';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { EntityCollectionServiceBase } from '@ngrx/data';
import { filter, tap, map, take, skip, takeUntil } from 'rxjs/operators';
import { ColumnType } from './interfaces/column-type';
import { Config } from './interfaces/config';
import * as uuid from 'uuid';

@Component({
  selector: 'app-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartTableComponent implements OnInit, OnDestroy {

  @ViewChild(Table) table!: Table;

  @Input() title!: string;

  @Input() columns!: Column[];
  @Input() config!: Config;
  @Input() actions!: Action[];
  @Input() buttons!: Button[];

  @Input() dataKey = 'id';
  @Input() entityService!: EntityCollectionServiceBase<any>;

  @Input() customDeleteFunction!: Function;
  @Input() customCreateFunction!: Function

  @Input() reuseLastState = false;
  @Input() paginator = true;
  @Input() rows = 10;

  @Input() fixedFilter!: {
    [s: string]: FilterMetadata[]
  };

  public creating = false;
  public formData: { [s: string]: FormGroup; } = {};
  public visibleColumns!: Column[];
  public columnsSize!: number;

  public columnsType = ColumnType;

  // fields to filter table
  public first = 0;
  public last = 0;
  public sortField: any;
  public sortOrder = 1;
  public filters: {
    [s: string]: FilterMetadata[]
  } = {};

  public matchMode = 'contains';
  public operator = 'or';

  public totalRecords = 0;

  private _firstLoaded = false;
  private _destroy$ = new Subject();

  private _currentPage = 1;
  private _lastPage = 1;

  public loading$!: Observable<boolean>;
  public source$!: Observable<any[]>;

  private _previousFilters!: Filter;
  private traceRequestId: string;

  constructor(
    private configPrimeNG: PrimeNGConfig,
    private formBuilder: FormBuilder,
    private paginatorService: PaginatorService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) {
    this.traceRequestId = uuid.v4();
  }

  ngOnDestroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  ngOnInit(): void {

    this.configPrimeNG.setTranslation({
      startsWith: 'Começa com',
      contains: 'Contém',
      notContains: 'Não contém',
      endsWith: 'Termina com',
      equals: 'Igual',
      notEquals: 'Diferente',
      matchAll: 'Encontra com: todas regras',
      matchAny: 'Encontra com: qualquer regra',
      addRule: 'Adicionar Regra',
      clear: 'Limpar',
      apply: 'Aplicar',
      removeRule: 'Remover Regra'
    });

    this.visibleColumns = this.columns.filter(c => c.visible === undefined || c.visible === true);
    this.columnsSize = this.visibleColumns.length + (this.actions?.length > 0 ? 2 : 1);

    this.getData();
    this.initCreate();
  }

  private getData(): void {

    // get loading state
    this.loading$ = this.entityService.loading$.pipe(takeUntil(this._destroy$));

    this.loadPreviousFilters().subscribe(lastFilter => {

      this.listeningFilters();

      let changes = 0;

      this.entityService.selectors$.pageInfo$.pipe(
        tap(() => ++changes),
        takeUntil(this._destroy$),
      ).subscribe((info: PageInfo | null) => {


        /**
         * initial entity state of info is null
         * when is null means it is first call
         */
        if (info === null || (changes === 1 && !this.reuseLastState)) {
          this.loadData(lastFilter);
          return;
        }

        if (info.traceKey !== null) {
          return;
        }

        this.first = info.first;
        this.last = info.last;
        this.rows = info.perPage;
        this.totalRecords = info.total;

        this._currentPage = info.currentPage;
        this._lastPage = info.lastPage;

        this.source$ = this.entityService.entities$.pipe(
          map((entities: any[]) => {
            return entities
              .filter(entity => info.ids.includes(entity[this.dataKey]))
              .sort((a, b) => info.ids.indexOf(a[this.dataKey]) > info.ids.indexOf(b[this.dataKey]) ? 1 : -1);
          })
        );
      });

    });
  }

  public loadData(event: LazyLoadEvent) {

    const filters = JSON.parse(JSON.stringify(event));

    // if change order, reset page
    if (this._previousFilters && (this._previousFilters.sortField || this._previousFilters.sortOrder) && (filters.sortField || filters.sortOrder)) {
      if (filters.sortField !== this._previousFilters.sortField || filters.sortOrder !== this._previousFilters.sortOrder) {
        filters.first = 0;
      }
    }

    this.entityService.setFilter(filters);
  }

  private listeningFilters() {

    // on change filter/pagination/sort
    this.entityService.filter$.pipe(
      takeUntil(this._destroy$),
      skip(1),
      filter(filters => !!filters)
    ).subscribe(filters => {

      this.search(filters);
    });
  }

  private search(filters?: Filter) {

    let clonedFilter = JSON.parse(JSON.stringify(filters ?? this._previousFilters));

    // add rows if not set
    if (!clonedFilter.rows) {
      clonedFilter = {
        ...clonedFilter,
        rows: this.rows
      };
    }

    // add fixed filter
    if (this.fixedFilter) {
      clonedFilter.filters = !clonedFilter.filters ? this.fixedFilter : {
        ...clonedFilter.filters,
        ...this.fixedFilter
      }
    }

    this.entityService.getWithQuery(this.paginatorService.getQuery(clonedFilter));
    this._previousFilters = clonedFilter;
  }

  private loadPreviousFilters(): Observable<Filter> {

    return this.entityService.filter$.pipe(
      take(1),
      map((filter: any) => {

        if (typeof filter === 'object') {

          const clonedFilter = JSON.parse(JSON.stringify(filter));

          if (clonedFilter.filters) {
            this.filters = clonedFilter.filters;
          }

          if (clonedFilter.sortField) {
            this.sortField = clonedFilter.sortField;
          }

          if (clonedFilter.sortOrder) {
            this.sortOrder = clonedFilter.sortOrder;
          }

          this.first = clonedFilter.first ?? 0;
          this.filters = clonedFilter.filters ?? {};

          return clonedFilter;
        }

        return {};

      })
    );
  }

  isLastPage(): boolean {
    return this._currentPage === this._lastPage;
  }

  isFirstPage(): boolean {
    return this._currentPage === 1;
  }

  getValue(o: any, colum: Column, type = 'input') {

    let s = '';

    if (type === 'display' && colum.valueLabel) {
      s = colum.valueLabel;
    } else if (colum.valueProp) {
      s = colum.valueProp;
    } else {
      s = colum.name;
    }

    if (s.indexOf('.') === -1) {
      return o[s];
    }

    const a = s.split('.');
    for (let i = 0, n = a.length; i < n; ++i) {
      const k = a[i];
      if (k in o) {
        o = o[k];
      } else {
        return;
      }
    }
    return o;
  }

  next() {

    if (this.isLastPage()) {
      return;
    }

    let first = this.first;
    let rows = this.rows;

    if (typeof first === 'string') {
      first = parseInt(first, 10);
    }

    if (typeof rows === 'string') {
      rows = parseInt(rows, 10);
    }

    const filters = { ...this.filters, rows, first: first + rows }
    this.loadData(filters);
  }

  prev() {

    if (this.isFirstPage()) {
      return;
    }

    let first = this.first;
    let rows = this.rows;

    if (typeof first === 'string') {
      first = parseInt(first, 10);
    }

    if (typeof rows === 'string') {
      rows = parseInt(rows, 10);
    }

    const filters = { ...this.filters, rows, first: first - rows }
    this.loadData(filters);
  }

  reset() {
    this.table.reset();
    this.initFilters();
  }

  refresh() {
    this.search();
  }

  create() {
    this.creating = true;
  }

  initFilters() {

    const filters: {
      [s: string]: FilterMetadata[]
    } = {};

    this.columns.forEach(c => {
      filters[c.name] = [{
        value: null,
        matchMode: this.matchMode,
        operator: this.operator,
      }];
    });

    this.filters = filters;
  }

  initCreate() {
    this.onInit({}, true);
  }

  onInit(data: any, creating = false) {

    const key = creating ? 'create' : data[this.dataKey];

    const controls: {
      [key: string]: any
    } = {};

    this.columns.forEach(c => {
      controls[c.name] = [creating ? null : this.getValue(data, c), c.validators];
    });

    this.formData[key] = this.formBuilder.group(controls);

    if (!creating) {
      this.table.initRowEdit(data);
    }
  }

  onSave(event: Event, data: any) {

    this.confirmationService.confirm({
      target: <EventTarget>event.target,
      message: 'Tem certeza que deseja atualizar os dados?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        const key = data[this.dataKey];

        this.entityService.update({
          ...data,
          ...this.formData[key].value
        }).subscribe(() => {
          this.onCancel(data);
        });
      }
    });

  }

  onCancel(data: any) {

    const key = data[this.dataKey];

    delete this.formData[key];
    this.table.cancelRowEdit(data);
  }

  onDelete(event: Event, data: any) {
    this.confirmationService.confirm({
      target: <EventTarget>event.target,
      message: 'Tem certeza que deseja deletar o registro?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {

        const fnc = this.customDeleteFunction ? this.customDeleteFunction(data) : this.entityService.delete(data);

        fnc.subscribe(() => {
          this.totalRecords--;

          this.source$ = this.source$.pipe(
            map(l => l.filter(i => i[this.dataKey] !== data[this.dataKey]))
          )
        });
      }
    });

  }

  onCreating(event: Event) {
    this.confirmationService.confirm({
      target: <EventTarget>event.target,
      message: 'Tem certeza que deseja criar o registro?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        const data = this.formData['create'].value;

        for (let column in data) {
          if (data[column] === undefined || data[column] === null || data[column] === '') {
            data[column] = this.columns.find(c => c.name === column)?.defaultValue;
          }
        }

        const fnc = this.customCreateFunction ? this.customCreateFunction(data) : this.entityService.add(data);

        fnc.subscribe(() => {
          this.search();
          this.onCancelCreating();
        });
      }
    });

  }

  onCancelCreating() {
    this.formData['create'].reset();
    this.creating = false;
  }

  getFormControl(key: string, column: string): FormControl {
    return <FormControl>this.formData[key].get(column);
  }

  callAction(item: any, action: Action) {
    action.callback(item[this.dataKey]);
  }

  clickButton(button: Button) {

    if (button.callback) {
      button.callback();
    }

    if (button.link) {
      this.router.navigate([button.link]);
    }
  }
}
