
export type Task = {
    id?: number;
    status?: string;
    title?: string;
    due_date?: string| Date;
    description?: string;
    color?: string;
    due_start: string | Date;
    due_end: string | Date;
};
export type EventItem = {
    start: Date;
    end: Date;
    data?: { task?: Task };
    isDraggable?: boolean;
};