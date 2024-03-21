import { Injectable } from '@angular/core';
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, exhaustMap, map } from 'rxjs';
import { HabitsApiActions } from './habits-api.actions';
import { addHabit, deleteHabit, updateHabit } from './habits.actions';
import { HabitService } from '../services/habit.service';

@Injectable()
export class ProjectsEffects {
    loadProjects$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            exhaustMap(() => this.habitService.getHabits()
                .pipe(
                    map(habits => HabitsApiActions.habitsLoadedSuccess({ habits })),
                    catchError(() => EMPTY)
                )
            )
        )
    )

    addProject$ = createEffect(() => 
        this.actions$.pipe(
            ofType(addHabit),
            exhaustMap(({ habit }) => this.habitService.createHabit(habit)
                .pipe(
                    map(habit => HabitsApiActions.habitAddedSuccess({ habit })),
                    catchError(() => EMPTY)
                )
            )
        )
    )

    deleteTask$ = createEffect(() => 
        this.actions$.pipe(
            ofType(deleteHabit),
            exhaustMap(({ habitId }) => this.habitService.deleteHabit(habitId)
                .pipe(
                    map(habit => HabitsApiActions.habitDeletedSuccess({ habitId: habit.id })),
                    catchError(() => EMPTY)
                )
            )
        )
    )

    updateTask$ = createEffect(() => 
        this.actions$.pipe(
            ofType(updateHabit),
            exhaustMap(({ habitId, values }) => this.habitService.updateHabit(habitId, values)
                .pipe(
                    map(habit => HabitsApiActions.habitUpdatedSuccess({ habit })),
                    catchError(() => EMPTY)
                )
            )
        )
    )

    constructor(
        private actions$: Actions,
        private habitService: HabitService
    ) {}
}