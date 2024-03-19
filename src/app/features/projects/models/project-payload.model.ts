import { View } from "./view.model";

export interface ProjectPayload {
    color: string; 
    description?: string;
    name: string;
    view: View; 
}