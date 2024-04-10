import { Section } from "./section.model";
import { View } from "./view.model";

export interface Project {
    areaId?: number;
    description?: string;
    defaultSectionId: number;
    id: number;
    isActive: boolean;
    isFavorite: boolean;
    name: string;
    ownerId: number; 
    order: number;
    sections: Section[];
    uuid: string;
    view: View; 
}