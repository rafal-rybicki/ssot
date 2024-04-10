import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { Project } from '../models/project.model';
import { ProjectsApiActions } from './projects-api.actions';
import { SectionsApiActions } from '../../sections/store/sections-api.actions';
  
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
        ),
        on(
            SectionsApiActions.sectionAddedSuccess,
            (state, { section }) => [...state.map(project => project.id === section.projectId ? {
                ...project,
                sections: [...project.sections, section]
            } : project)]
        ),
        on(
            SectionsApiActions.sectionDeletedSuccess,
            (state, { sectionId, projectId }) => [...state.map(project => project.id === projectId ? {
                ...project,
                sections: project.sections.filter(section => section.id !== sectionId)
            } : project)]
        ),
        on(
            SectionsApiActions.sectionUpdatedSuccess,
            (state, { section }) => [...state.map(project => project.id === section.projectId ? {
                ...project,
                sections: [...project.sections.map(s => s.id === section.id ? section : s)]
            } : project)]
        ),
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