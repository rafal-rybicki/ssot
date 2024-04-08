import { View } from "./view.model";

export interface ProjectPayload {
    areaId?: number;
    description?: string;
    isActive?: boolean;
    isFavorite?: boolean;
    name: string;
    ownerId: number; 
    order: number;
    uuid: string;
    view: View; 
}