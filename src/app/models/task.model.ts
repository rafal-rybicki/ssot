export interface Task {
    completedSubtasks?: number;
    content: string;
    date?: string;
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