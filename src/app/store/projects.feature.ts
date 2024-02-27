import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { Project } from '../models/project.model';
import * as ProjectsActions from './projects.actions';

interface State extends Array<Project> {}
  
const initialState: State = [
]

export const projectsFeature = createFeature({
    name: 'projects',
    reducer: createReducer(
        initialState,
        on(
            ProjectsActions.addProject,
            (state, task) => [...state, task]
        ),
        on(
            ProjectsActions.deleteProject,
            (state, { projectId }) => [...state.filter(project => project.id !== projectId)]
        ),
        on(
            ProjectsActions.updateProject,
            (state, { projectId, values }) => [
                ...state.map((project) => project.id === projectId ? { ...project, ...values } : project)
            ]
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