import { createActionGroup, props } from '@ngrx/store';
import { HabitItem } from '../models/habit-item.model';

export const HabitItemsApiActions = createActionGroup({
    source: 'HabitItems API',
    events: {
        habitItemAddedSuccess: props<{ habitItem: HabitItem }>(),
        habitItemAddedFailure: props<{ errorMsg: string }>(),
        habitItemUpdatedSuccess: props<{ habitItem: HabitItem }>(), 
        habitItemUpdatedFailure: props<{ errorMsg: string }>(),
        habitItemsLoadedSuccess: props<{ habitItems: HabitItem[] }>(),
        habitItemsLoadedFailure: props<{ errorMsg: string }>()
    }
});