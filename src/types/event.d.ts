export type Task = {
    ID: number;
    Status?: string;
    Title?: string;
    DueDate?: string | Date | undefined;
    Description?: string;
    StartDate?: string | Date;
};
export type EventItem = {
    start: Date;
    end: Date;
    data?: { task?: Task };
    isDraggable?: boolean;
};
export type sendTask = {
    Status: string;
    Title: string;
    DueDate: string | Date | undefined;
    Description: string;
    StartDate: string | Date;
};
