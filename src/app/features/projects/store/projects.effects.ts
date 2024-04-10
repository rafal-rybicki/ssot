import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectService } from '../services/project.service';
import { EMPTY, catchError, exhaustMap, map } from 'rxjs';
import { ProjectsApiActions } from './projects-api.actions';
import { addProject, deleteProject, updateProject } from './projects.actions';
import { loadUsersData } from '../../../core/store/user/user.actions';

@Injectable()
export class ProjectsEffects {
    loadProjects$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadUsersData),
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
            exhaustMap(({ projectPayload }) => this.projectService.createProject(projectPayload)
                .pipe(
                    map(project => ProjectsApiActions.projectAddedSuccess({ project })),
                    catchError((err) => EMPTY)
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