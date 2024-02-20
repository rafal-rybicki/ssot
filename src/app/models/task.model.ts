export interface Task {
    content: string;
    completedSubtasks?: number;
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
    subtasks?: number;
}