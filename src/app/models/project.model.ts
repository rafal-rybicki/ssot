import { View } from "./view.model";

export interface Project {
    areaId?: string;
    color: string; 
    description?: string;
    id: string;
    isActive: boolean;
    name: string;
    ownerId: string; 
    order: number;
    view: View; 
}