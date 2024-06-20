export type Task = {
    ID: number;
    Status: string;
    Title: string;
    DueDate: string;
    Description: string;
    StartDate: string;
    Color: string;
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
    DueDate: string;
    Description: string;
    StartDate: string;
    Color: string;
};
