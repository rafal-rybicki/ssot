import { createAction, props } from '@ngrx/store';
import { HabitPayload } from '../models/habit-payload.model';
import { Habit } from '../models/habit.model';

export const addHabit = createAction('[HabitNew Component] Add', props<{ habit: HabitPayload }>());
export const updateHabit = createAction('[HabitEdit Component] Update', props<{ habitId: number, values: Partial<Habit> }>());
export const deleteHabit = createAction('[Habit Component] Delete', props<{ habitId: number }>());