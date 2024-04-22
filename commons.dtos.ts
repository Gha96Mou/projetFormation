/**
 * Represents the pagination options for a list of items.
 */
export interface IPagination {
  descending?: boolean; // Specifies whether the list should be sorted in descending order.
  page: number; // The current page number.
  rowsNumber: number; // The total number of rows in the list.
  rowsPerPage: number; // The number of rows to display per page.
  sortBy?: string; // The field to sort the list by.
}

/**
 * Represents the search criteria and pagination options for a list of items.
 */
export interface ISearchDto<T> {
  criterias?: T; // The search criteria.
  pagination: IPagination; // The pagination options.
}

/**
 * Represents a paginated list of items.
 * The `rowCount` property is filled only when the first page of data is requested.
 */
export interface IPaginatedListDto<T> {
  list: T[]; // The list of items.
  rowsNumber: number; // The total number of rows in the list.
}
