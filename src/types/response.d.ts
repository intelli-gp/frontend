export type Response = {
    status: string;
    data: any;
};

export type GenericResponse<T> = {
    status: string;
    data: T;
};

export type NestErrorResponse = {
    statusCode: number;
    error: string;
    message: string | string[];
};
