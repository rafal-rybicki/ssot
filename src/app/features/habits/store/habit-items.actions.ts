import { createAction, props } from '@ngrx/store';
import { HabitItem } from '../models/habit-item.model';

export const updateOrCreateHabitItem = createAction('[HabitItem] UpdateOrCreate', props<{ habitItem: HabitItem }>());