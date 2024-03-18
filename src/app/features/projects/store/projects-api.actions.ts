import { createActionGroup, props } from '@ngrx/store';
import { Project } from '../models/project.model';

export const ProjectsApiActions = createActionGroup({
    source: 'Projects API',
    events: {
        projectAddedSuccess: props<{ project: Project }>(),
        projectAddedFailure: props<{ errorMsg: string }>(),
        projectDeletedSuccess: props<{ projectId: string }>(),
        projectDeletedFailure: props<{ errorMsg: string }>(),
        projectUpdatedSuccess: props<{ project: Project }>(), 
        projectUpdatedFailure: props<{ errorMsg: string }>(),
        projectsLoadedSuccess: props<{ projects: Project[] }>(),
        projectsLoadedFailure: props<{ errorMsg: string }>()
    }
});