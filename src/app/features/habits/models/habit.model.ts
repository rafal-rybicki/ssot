export interface Habit {
    dailyTarget: number;
    endDate?: string;
    id: number;
    isActive: boolean;
    isShownOnTodayView: boolean;
    name: string;
    order: number;
    ownerId: number;
    startDate: string;
    uuid: string;
    weekDays: number[];
}