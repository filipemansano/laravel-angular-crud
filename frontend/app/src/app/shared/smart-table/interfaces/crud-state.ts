import { Filter } from "./filter";
import { PaginationResult } from "./pagination-result";

export interface CrudState<T> {
  list: PaginationResult<T> | null;
  filter: Filter | null
  selected: T | null;
}
