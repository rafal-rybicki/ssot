import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { Project } from '../models/project.model';
import { View } from '../models/view.model';
import { Color } from '../models/color.model';

interface State extends Array<Project> {}
  
const initialState: State = [
    {
        areaId: '1',
        color: Color.Blue,
        id: '1',
        isActive: true,
        name: 'Project 1',
        ownerId: '1',
        order: 1,
        view: View.List
    },
    {
        areaId: '1',
        color: Color.Yellow,
        id: '2',
        isActive: true,
        name: 'Project 2',
        ownerId: '1',
        order: 2,
        view: View.List
    },
    {
        areaId: '1',
        color: Color.Blue,
        id: '3',
        isActive: true,
        name: 'Project 3',
        ownerId: '1',
        order: 3,
        view: View.List
    },
    {
        areaId: '1',
        color: Color.Yellow,
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
        initialState
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