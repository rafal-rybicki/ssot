export interface HabitItem {
    id?: number;
    currentValue: number;
    date: string;
    description?: string;
    habitId: number;
    ownerId: number;
    targetValue: number;
    uuid: string;
}