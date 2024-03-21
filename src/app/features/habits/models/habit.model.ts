export interface Habit {
    dailyGoal: number;
    description?: string;
    endDate?: string;
    id: string;
    isActive: boolean;
    name: string;
    monitored: boolean;
    ownerId: string;
    order: number;
    startDate: string;
}