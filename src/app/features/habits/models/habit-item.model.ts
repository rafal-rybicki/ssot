export interface HabitItem {
    id: string;
    currentValue: number;
    date: string;
    description?: string;
    habitId: string;
    isCompleted: boolean;
    name: string;
    targetValue: number;
}