import { Color } from "./color.model";
import { View } from "./view.model";

export interface Project {
    areaId?: string;
    color: Color; 
    description?: string;
    id: string;
    isActive: boolean;
    name: string;
    ownerId: string; 
    order: number;
    view: View; 
}