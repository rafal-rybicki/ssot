export interface HabitFormData {
    dailyTarget: number;
    endDate?: string;
    isShownOnTodayView: boolean;
    name: string;
    startDate: string;
    weekDays: number[];
}