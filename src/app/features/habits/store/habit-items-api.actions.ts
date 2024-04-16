import { createActionGroup, props } from '@ngrx/store';
import { HabitItem } from '../models/habit-item.model';

export const HabitItemsApiActions = createActionGroup({
    source: 'HabitItems API',
    events: {
        habitItemUpdatedOrCreatedSuccess: props<{ habitItem: HabitItem }>(), 
        habitItemUpdatedOrCreatedFailure: props<{ errorMsg: string }>(),
        habitItemsLoadedSuccess: props<{ habitItems: HabitItem[] }>(),
        habitItemsLoadedFailure: props<{ errorMsg: string }>()
    }
});