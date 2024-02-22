export interface Task {
    allSubtasks?: number;
    completedSubtasks?: number;
    content: string;
    date: number;
    description?: string;
    duration: number;
    id: string;
    isCompleted: boolean;
    isTimeSet: boolean;
    ownerId: string;
    order: number;
    priority: boolean;
    projectId?: string;
    sectionId?: string;
}