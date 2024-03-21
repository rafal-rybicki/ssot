export interface HabitPayload {
    dailyGoal: number;
    description?: string;
    endDate?: string;
    isMonitored: boolean;
    name: string;
    startDate: string;
}