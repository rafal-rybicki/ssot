import { createAction, props } from '@ngrx/store';
import { Project } from '../models/project.model';
import { ProjectPayload } from '../models/project-payload.model';

export const addProject = createAction('[ProjectEditor Component] Add', props<{ projectPayload: ProjectPayload }>());
export const updateProject = createAction('[ProjectEditor Component] Update', props<{ projectId: number, values: Partial<Project> }>());
export const deleteProject = createAction('[Project] Delete', props<{ projectId: number }>());