import moment from 'moment';

export const EVENTS = [
    {
        start: moment('2023-12-24T10:00:00').toDate(),
        end: moment('2023-12-24T11:00:00').toDate(),
        data: {
            task: {
                id: 1,
                status: 'P',
                courseName: 'Math',
                start: '10',
                end: '11am',
            },
        },
    },
    {
        start: moment('2023-12-24T12:00:00').toDate(),
        end: moment('2023-12-24T15:00:00').toDate(),
        data: {
            task: {
                id: 2,
                status: 'CI',
                courseName: 'Database',
                start: '12',
                end: '3pm',
            },
        },
    },
];
