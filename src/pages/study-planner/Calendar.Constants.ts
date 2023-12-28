import moment from "moment";
export type Appointment = {
    id?: number;
    status?: string;
    courseName?: string;
    description?: string;
    taskName?: string;
    color?: string;
    start: string | Date;
    end: string | Date;
  };
export type EventItem = {
    start: Date;
    end: Date;
    data?: { appointment?: Appointment };
    isDraggable?: boolean;
  };
export enum AppointmentStatusCode {
  Pending = "P",
  CheckedIn = "CI",
}

export const EVENT_STATUS_COLORS = {
  P: "#bee2fa",
  CI: "#c7edca",
};

export const EVENTS: EventItem[] = [
  {
    start: moment("2023-12-24T10:00:00").toDate(),
    end: moment("2023-12-24T11:00:00").toDate(),
    data: {
      appointment: {
        id: 1,
        status: "P",        
        courseName: "Math",
        start: "10",
        end: "11am",
      },
    },
    isDraggable: true,
  },
  {
    start: moment("2023-12-24T12:00:00").toDate(),
    end: moment("2023-12-24T15:00:00").toDate(),
    data: {
      appointment: {
        id: 2,
        status: "CI",
        courseName: "Database",
        start: "12",
        end: "3pm",
      },
    },
    isDraggable: false,
  },
];