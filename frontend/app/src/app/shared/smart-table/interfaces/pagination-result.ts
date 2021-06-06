export interface PageInfo {
  first: number;
  last: number;
  total: number;
  ids: any[];
  perPage: number;
  currentPage: number;
  lastPage: number;
  traceKey: string;
}
export interface PaginationResult<T> {
  data: T[];
  pageInfo: PageInfo;
}
