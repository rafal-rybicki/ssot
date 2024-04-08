export interface Task {
    completedSubtasks?: number;
    content: string;
    date?: string;
    description?: string;
    duration: number;
    id: number;
    isCompleted: boolean;
    isTimeSet: boolean;
    ownerId: string;
    order: number;
    priority: boolean;
    projectId?: number;
    sectionId?: number;
    subtasks?: number;
}