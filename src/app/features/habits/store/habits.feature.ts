import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { Habit } from '../models/habit.model';
import { HabitsApiActions } from './habits-api.actions';
  
const initialState: Habit[] = [];

export const habitsFeature = createFeature({
    name: 'habits',
    reducer: createReducer(
        initialState,
        on(
            HabitsApiActions.habitsLoadedSuccess,
            (state, { habits }) => [...habits]
        ),
        on(
            HabitsApiActions.habitAddedSuccess,
            (state, { habit }) => [...state, habit]
        ),
        on(
            HabitsApiActions.habitDeletedSuccess,
            (state, { habitId }) => [...state.filter(habit => habit.id !== habitId)]
        ),
        on(
            HabitsApiActions.habitUpdatedSuccess,
            (state, { habit }) => [...state.map(h => h.id === habit.id ? habit : h)]
        )
    ),
    extraSelectors: ({ selectHabitsState }) => ({
        selectActiveHabits: createSelector(
            selectHabitsState,
            (habits) => habits.filter(habit => habit.isActive === true)
        ),
        selectInactiveHabits: createSelector(
            selectHabitsState,
            (habits) => habits.filter(habit => habit.isActive === false)
        )
    })
})

export const {
    name,
    reducer,
    selectHabitsState,
    selectActiveHabits,
    selectInactiveHabits,
} = habitsFeature;