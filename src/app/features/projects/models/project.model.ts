import { Section } from "./section.model";
import { View } from "./view.model";

export interface Project {
    areaId?: string;
    color: string; 
    defaultSectionId: string;
    description?: string;
    id: string;
    isActive: boolean;
    isFavorite: boolean;
    name: string;
    ownerId: string; 
    order: number;
    sections: Section[];
    view: View; 
}