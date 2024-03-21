export interface HabitItem {
    id: string;
    habitId: string;
    isCompleted: boolean;
    currentValue: number;
    date: string;
    description?: string;
}