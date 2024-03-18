import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { Project } from '../models/project.model';
import { ProjectsApiActions } from './projects-api.actions';
  
const initialState: Project[] = []

export const projectsFeature = createFeature({
    name: 'projects',
    reducer: createReducer(
        initialState,
        on(
            ProjectsApiActions.projectsLoadedSuccess,
            (state, { projects }) => [...projects]
        ),
        on(
            ProjectsApiActions.projectAddedSuccess,
            (state, { project }) => [...state, project]
        ),
        on(
            ProjectsApiActions.projectDeletedSuccess,
            (state, { projectId }) => [...state.filter(project => project.id !== projectId)]
        ),
        on(
            ProjectsApiActions.projectUpdatedSuccess,
            (state, { project }) => [...state.map((p) => p.id === project.id ? project : p)]
        )
    ),
    extraSelectors: ({ selectProjectsState }) => ({
        selectActiveProjects: createSelector(
            selectProjectsState,
            (projects) => projects.filter(project => project.isActive === true)
        ),
        selectInactiveProjects: createSelector(
            selectProjectsState,
            (projects) => projects.filter(project => project.isActive === false)
        )
    })
})

export const {
    name,
    reducer,
    selectProjectsState,
    selectActiveProjects,
    selectInactiveProjects,
} = projectsFeature;