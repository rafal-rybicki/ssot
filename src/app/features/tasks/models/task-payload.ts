export interface TaskPayload {
    content: string;
    date?: string;
    description?: string;
    duration?: number;
    hour?: string;
    ownerId: number;
    projectId?: number;
    sectionId?: number;
    uuid: string;
}