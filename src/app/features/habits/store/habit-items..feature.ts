import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { HabitItem } from '../models/habit-item.model';
import { HabitItemsApiActions } from './habit-items-api.actions';
  
const initialState: HabitItem[] = [];

export const habitItemsFeature = createFeature({
    name: 'habitItems',
    reducer: createReducer(
        initialState,
        on(
            HabitItemsApiActions.habitItemsLoadedSuccess,
            (state, { habitItems }) => [...habitItems]
        ),
        on(
            HabitItemsApiActions.habitItemAddedSuccess,
            (state, { habitItem }) => [...state, habitItem]
        ),
        on(
            HabitItemsApiActions.habitItemUpdatedSuccess,
            (state, { habitItem }) => [...state.map(h => h.id === habitItem.id ? habitItem : h)]
        )
    ),
    extraSelectors: ({ selectHabitItemsState }) => ({
        // selectActiveHabits: createSelector(
        //     selectHabitsState,
        //     (habits) => habits.filter(habitItem => habitItem.isActive === true)
        // ),
        // selectInactiveHabits: createSelector(
        //     selectHabitsState,
        //     (habits) => habits.filter(habitItem => habitItem.isActive === false)
        // )
    })
})

export const {
    name,
    reducer,
    selectHabitItemsState,
} = habitItemsFeature;