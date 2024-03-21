import { Injectable } from '@angular/core';
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from '@ngrx/effects';
import { ProjectService } from '../services/project.service';
import { EMPTY, catchError, exhaustMap, map, tap } from 'rxjs';
import { ProjectsApiActions } from './projects-api.actions';
import { addProject, deleteProject, updateProject } from './projects.actions';

@Injectable()
export class ProjectsEffects {
    loadProjects$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            exhaustMap(() => this.projectService.getProjects()
                .pipe(
                    map(projects => ProjectsApiActions.projectsLoadedSuccess({ projects })),
                    catchError(() => EMPTY)
                )
            )
        )
    )

    addProject$ = createEffect(() => 
        this.actions$.pipe(
            ofType(addProject),
            exhaustMap(({ project }) => this.projectService.createProject(project)
                .pipe(
                    map(project => ProjectsApiActions.projectAddedSuccess({ project })),
                    catchError(() => EMPTY)
                )
            )
        )
    )

    deleteProject$ = createEffect(() => 
        this.actions$.pipe(
            ofType(deleteProject),
            exhaustMap(({ projectId }) => this.projectService.deleteProject(projectId)
                .pipe(
                    map(project => ProjectsApiActions.projectDeletedSuccess({ projectId: project.id })),
                    catchError(() => EMPTY)
                )
            )
        )
    )

    updateProject$ = createEffect(() => 
        this.actions$.pipe(
            ofType(updateProject),
            exhaustMap(({ projectId, values }) => this.projectService.updateProject(projectId, values)
                .pipe(
                    map(project => ProjectsApiActions.projectUpdatedSuccess({ project })),
                    catchError(() => EMPTY)
                )
            )
        )
    )

    constructor(
        private actions$: Actions,
        private projectService: ProjectService
    ) {}
}