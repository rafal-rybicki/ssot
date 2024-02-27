export interface Task {
    completedSubtasks?: number;
    content: string;
    date: number;
    description?: string;
    duration: number;
    id: number;
    isCompleted: boolean;
    isTimeSet: boolean;
    ownerId: number;
    order: number;
    priority: boolean;
    projectId?: number;
    sectionId?: number;
    subtasks?: number;
}