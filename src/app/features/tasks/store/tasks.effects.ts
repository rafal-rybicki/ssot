import { Injectable } from '@angular/core';
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from '@ngrx/effects';
import { TaskService } from '../services/task.service';
import { EMPTY, catchError, exhaustMap, map } from 'rxjs';
import { TasksApiActions } from './tasks-api.actions';
import { addTask, deleteTask, updateTask } from './tasks.actions';

@Injectable()
export class TasksEffects {
    loadTasks$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            exhaustMap(() => this.taskService.getTasks()
                .pipe(
                    map(tasks => TasksApiActions.tasksLoadedSuccess({ tasks })),
                    catchError(() => EMPTY)
                )
            )
        )
    )

    addTask$ = createEffect(() => 
        this.actions$.pipe(
            ofType(addTask),
            exhaustMap(({ task }) => this.taskService.createTask(task)
                .pipe(
                    map(task => TasksApiActions.taskAddedSuccess({ task })),
                    catchError(() => EMPTY)
                )
            )
        )
    )

    deleteTask$ = createEffect(() => 
        this.actions$.pipe(
            ofType(deleteTask),
            exhaustMap(({ taskId }) => this.taskService.deleteTask(taskId)
                .pipe(
                    map(task => TasksApiActions.taskDeletedSuccess({ taskId: task.id })),
                    catchError(() => EMPTY)
                )
            )
        )
    )

    updateTask$ = createEffect(() => 
        this.actions$.pipe(
            ofType(updateTask),
            exhaustMap(({ taskId, values }) => this.taskService.updateTask(taskId, values)
                .pipe(
                    map(task => TasksApiActions.taskUpdatedSuccess({ task })),
                    catchError(() => EMPTY)
                )
            )
        )
    )

    constructor(
        private actions$: Actions,
        private taskService: TaskService
    ) {}
}