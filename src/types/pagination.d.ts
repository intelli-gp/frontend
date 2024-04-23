export interface PaginatedResult<T> {
    TotalEntityCount: number;
    CurrentPageNum: number;
    LimitPerPage: number;
    NumPages: number;
    NextPageNum: number;
    PreviousPageNum: number;
    Results: T[];
}
