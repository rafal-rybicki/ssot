import { createAction, props } from '@ngrx/store';
import { Habit } from '../models/habit.model';

export const addHabit = createAction('[HabitNew Component] Add', props<{ habit: Habit }>());
export const updateHabit = createAction('[HabitEdit Component] Update', props<{ habitId: string, values: Partial<Habit> }>());
export const deleteHabit = createAction('[Habit Component] Delete', props<{ habitId: string }>());