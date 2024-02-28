import { createAction, props } from '@ngrx/store';
import { Project } from '../models/project.model';

export const addProject = createAction('[ProjectEditor Component] Add', props<{ project: Project }>());
export const updateProject = createAction('[ProjectEditor Component] Update', props<{ projectId: number, values: Partial<Project> }>());
export const deleteProject = createAction('[Project] Delete', props<{ projectId: number }>());