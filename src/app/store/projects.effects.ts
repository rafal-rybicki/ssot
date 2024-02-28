import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectService } from '../services/project.service';
import { appInit } from './app.actions';
import { EMPTY, catchError, exhaustMap, map, tap } from 'rxjs';
import { ProjectsApiActions } from './projects-api.actions';
import { addProject } from './projects.actions';

@Injectable()
export class ProjectsEffects {
    loadProjects$ = createEffect(() => 
        this.actions$.pipe(
            ofType(appInit),
            exhaustMap(() => this.projectService.getProjects()
                .pipe(
                    map(projects => ProjectsApiActions.projectsLoadedSuccess({ projects })),
                    catchError(() => EMPTY)
                )
            )
        )
    )

    addproject$ = createEffect(() => 
        this.actions$.pipe(
            ofType(addProject),
            exhaustMap(action => this.projectService.createProject(action.project)
                .pipe(
                    map(project => ProjectsApiActions.projectAddedSuccess({ project })),
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