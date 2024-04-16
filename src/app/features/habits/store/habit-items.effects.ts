import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, exhaustMap, map, mergeMap } from 'rxjs';
import { HabitItemService } from '../services/habit-item.service';
import { HabitItemsApiActions } from './habit-items-api.actions';
import { updateOrCreateHabitItem } from './habit-items.actions';
import { loadUsersData } from '../../../core/store/user/user.actions';

@Injectable()
export class HabitItemsEffects {
    loadHabitItems$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadUsersData),
            exhaustMap(() => this.habitItemsService.getHabitItems()
                .pipe(
                    map(habitItems => HabitItemsApiActions.habitItemsLoadedSuccess({ habitItems })),
                    catchError(() => EMPTY)
                )
            )
        )
    )

    updateOrCreateHabitItem$ = createEffect(() => 
        this.actions$.pipe(
            ofType(updateOrCreateHabitItem),
            exhaustMap(({ habitItem }) => this.habitItemsService.updateOrCreateHabitItem(habitItem)
                .pipe(
                    map(habitItem => HabitItemsApiActions.habitItemUpdatedOrCreatedSuccess({ habitItem })),
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