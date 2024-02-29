import { createFeature, createReducer, on } from '@ngrx/store';
import { Task } from '../../models/task.model';
import { TasksApiActions } from './tasks-api.actions';
  
const initialState: Task[] = []

export const tasksFeature = createFeature({
    name: 'tasks',
    reducer: createReducer(
        initialState,
        on(
            TasksApiActions.tasksLoadedSuccess,
            (state, { tasks }) => [...tasks]
        ),
        on(
            TasksApiActions.taskAddedSuccess,
            (state, { task }) => [...state, task]
        ),
        on(
            TasksApiActions.taskDeletedSuccess,
            (state, { taskId }) => [...state.filter(task => task.id !== taskId)]
        ),
        on(
            TasksApiActions.taskUpdatedSuccess,
            (state, { task }) => [...state.map((t) => t.id === task.id ? task : t)]
        )
    )
})

export const {
    name,
    reducer,
    selectTasksState,
} = tasksFeature;