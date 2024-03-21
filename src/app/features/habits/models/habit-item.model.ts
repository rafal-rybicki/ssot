export interface HabitItem {
    id: string;
    isCompleted: boolean;
    currentValue: number;
    date: string;
    description?: string;
    habitId: string;
}