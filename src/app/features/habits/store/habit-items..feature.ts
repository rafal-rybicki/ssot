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
            HabitItemsApiActions.habitItemUpdatedOrCreatedSuccess,
            (state, { habitItem }) => {
                const index = state.findIndex((item) => item.id === habitItem.id);
                
                if (index > -1) {
                    const newState = [...state];
                    newState[index] = habitItem;
                    return newState;
                } else {
                    return [...state, habitItem];
                }
            }
        )
    ),
    extraSelectors: ({ selectHabitItemsState }) => ({
        selectHabitItemsByHabitId: createSelector(
            selectHabitItemsState,
            (habitItems) => habitItems.reduce((acc: any, habitItem: HabitItem) => {
                if(habitItem.habitId) {
                    if (acc[habitItem.habitId]) {
                        acc[habitItem.habitId][habitItem.date] = habitItem;
                    } else {
                        acc[habitItem.habitId] = { [habitItem.date]: habitItem };
                    }
                }
                return acc;
            }, {})
        ),
        selectHabitItemsByIndex: createSelector(
            selectHabitItemsState,
            (habitItems) => habitItems.reduce((acc: any, item: HabitItem) => {
                acc[`${item.habitId}-${item.date}`] = item;
                return acc;
            }, {})
        )
    })
})

export const {
    name,
    reducer,
    selectHabitItemsState,
    selectHabitItemsByHabitId,
    selectHabitItemsByIndex
} = habitItemsFeature;