export type Task = {
    ID?: number;
    Status?: string;
    Title?: string;
    DueDate?: string | Date | undefined;
    Description?: string;
    Color?: string;
    DueStart: string | Date;
    DueEnd: string | Date;
};
export type EventItem = {
    start: Date;
    end: Date;
    data?: { task?: Task };
    isDraggable?: boolean;
};
