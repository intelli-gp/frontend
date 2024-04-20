export type Response = {
    status: string;
    data: any;
};

export type GenericResponse<T> = {
    status: string;
    data: T;
};
