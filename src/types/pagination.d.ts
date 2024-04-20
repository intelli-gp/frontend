export interface PaginatedResult<T> {
    CurrentPageNum:number;
    LimitPerPage: number;
    Count: number;
    NumPages: number;
    NextPageNum:number;
    PreviousPageNum:number;
    Results: T[];
}
