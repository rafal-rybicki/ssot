import { createAction, props } from '@ngrx/store';
import { HabitItem } from '../models/habit-item.model';

export const addHabitItem = createAction('[Habits Component] Add HabitItem', props<{ habitItem: HabitItem }>());
export const updateHabitItem = createAction('[HabitItem] Update', props<{ habitItemId: string, values: Partial<HabitItem> }>());