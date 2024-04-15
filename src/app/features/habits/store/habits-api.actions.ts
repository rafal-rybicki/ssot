import { createActionGroup, props } from '@ngrx/store';
import { Habit } from '../models/habit.model';


export const HabitsApiActions = createActionGroup({
    source: 'Habits API',
    events: {
        habitAddedSuccess: props<{ habit: Habit }>(),
        habitAddedFailure: props<{ errorMsg: string }>(),
        habitDeletedSuccess: props<{ habitId: number }>(),
        habitDeletedFailure: props<{ errorMsg: string }>(),
        habitUpdatedSuccess: props<{ habit: Habit }>(), 
        habitUpdatedFailure: props<{ errorMsg: string }>(),
        habitsLoadedSuccess: props<{ habits: Habit[] }>(),
        habitsLoadedFailure: props<{ errorMsg: string }>()
    }
});