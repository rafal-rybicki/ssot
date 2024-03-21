import { HabitItem } from "./habit-item.model";

export interface Habit {
    dailyGoal: number;
    description?: string;
    endDate?: string;
    id: string;
    isActive: boolean;
    isMonitored: boolean;
    items: HabitItem[];
    name: string;
    ownerId: string;
    order: number;
    startDate: string;
}