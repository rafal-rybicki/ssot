export interface CalendarMonth {
    days: Day[];
    name: string;
    offset: number;
}

interface Day {
    day: number;
    date: string;
}