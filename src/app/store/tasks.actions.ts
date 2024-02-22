import { createAction, props } from '@ngrx/store';
import { Task } from "../models/task.model";

export const addTask = createAction('[NewTask Component] Add', props<Task>());
export const deleteTask = createAction('[Task Component] Delete', props<{ taskId: string }>());
export const updateTask = createAction('[Task Component] Update', props<{ taskId: string, values: Partial<Task> }>());