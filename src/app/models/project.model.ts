import { View } from "./view.model";

export interface Project {
    areaId?: number;
    color: string; 
    description?: string;
    id: number;
    isActive: boolean;
    name: string;
    ownerId: number; 
    order: number;
    view: View; 
}