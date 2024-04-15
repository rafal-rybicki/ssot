export interface HabitPayload {
    dailyTarget: number;
    endDate?: string;
    isShownOnTodayView: boolean;
    name: string;
    order: number;
    ownerId: number;
    startDate: string;
    uuid: string;
    weekDays: number[];
}