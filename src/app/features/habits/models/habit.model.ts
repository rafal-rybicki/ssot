export interface Habit {
    dailyGoal: number;
    description?: string;
    endDate?: string;
    id: string;
    isActive: boolean;
    isMonitored: boolean;
    name: string;
    ownerId: string;
    order: number;
    startDate: string;
}