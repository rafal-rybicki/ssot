import { Injectable } from '@angular/core';
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, exhaustMap, map, mergeMap } from 'rxjs';
import { HabitItemService } from '../services/habit-item.service';
import { HabitItemsApiActions } from './habit-items-api.actions';
import { addHabitItem, updateHabitItem } from './habit-items.actions';

@Injectable()
export class HabitItemsEffects {
    loadHabitItems$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            exhaustMap(() => this.habitItemsService.getHabitItems()
                .pipe(
                    map(habitItems => HabitItemsApiActions.habitItemsLoadedSuccess({ habitItems })),
                    catchError(() => EMPTY)
                )
            )
        )
    )

    addHabitItem$ = createEffect(() => 
        this.actions$.pipe(
            ofType(addHabitItem),
            mergeMap(({ habitItem }) => this.habitItemsService.createHabitItem(habitItem)
                .pipe(
                    map(habitItem => HabitItemsApiActions.habitItemAddedSuccess({ habitItem })),
                    catchError((err) => {
                        console.error(err);
                        return EMPTY;
                    })
                )
            )
        )
    )

    updateHabitItem$ = createEffect(() => 
        this.actions$.pipe(
            ofType(updateHabitItem),
            exhaustMap(({ habitItemId, values }) => this.habitItemsService.updateHabitItem(habitItemId, values)
                .pipe(
                    map(habitItem => HabitItemsApiActions.habitItemUpdatedSuccess({ habitItem })),
                    catchError(() => EMPTY)
                )
            )
        )
    )

    constructor(
        private actions$: Actions,
        private habitItemsService: HabitItemService
    ) {}
}