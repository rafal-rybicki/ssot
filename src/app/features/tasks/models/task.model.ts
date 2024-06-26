export interface Task {
    content: string;
    date?: string;
    description?: string;
    duration?: number;
    hour?: string;
    id: number;
    isCompleted: boolean;
    isPriority: boolean;
    order: number;
    ownerId: number;
    projectId?: number;
    sectionId?: number;
    uuid: string;
}