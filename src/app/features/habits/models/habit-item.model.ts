export interface HabitItem {
    id?: number;
    currentValue: number;
    dailyTarget: number;
    date: string;
    description?: string;
    habitId: number;
    ownerId: number;
    uuid: string;
}