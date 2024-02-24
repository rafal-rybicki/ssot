import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { Project } from '../models/project.model';
import { View } from '../models/view.model';
import * as ProjectsActions from './projects.actions';

interface State extends Array<Project> {}
  
const initialState: State = [
    {
        areaId: '1',
        color: 'blue',
        id: '1',
        isActive: true,
        name: 'Project 1',
        ownerId: '1',
        order: 1,
        view: View.List
    },
    {
        areaId: '1',
        color: 'yellow',
        id: '2',
        isActive: true,
        name: 'Project 2',
        ownerId: '1',
        order: 2,
        view: View.List
    },
    {
        areaId: '1',
        color: 'green',
        id: '3',
        isActive: true,
        name: 'Project 3',
        ownerId: '1',
        order: 3,
        view: View.List
    },
    {
        areaId: '1',
        color: 'orange',
        id: '4',
        isActive: false,
        name: 'Project 4',
        ownerId: '1',
        order: 4,
        view: View.List
    }
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