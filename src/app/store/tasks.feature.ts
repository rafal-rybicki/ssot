import { createFeature, createReducer, on } from '@ngrx/store';
import { Task } from '../models/task.model';
import * as TasksActions from './tasks.actions';

interface State extends Array<Task> {}
  
const initialState: State = [
]

export const tasksFeature = createFeature({
    name: 'tasks',
    reducer: createReducer(
        initialState,
        on(
            TasksActions.addTask,
            (state, task) => [...state, task]
        ),
        on(
            TasksActions.deleteTask,
            (state, { taskId }) => [...state.filter(task => task.id !== taskId)]
        ),
        on(
            TasksActions.updateTask,
            (state, { taskId, values }) => [...state.map((task) => task.id === taskId ? { ...task, ...values } : task)]
        )
    )
})

export const {
    name,
    reducer,
    selectTasksState,
} = tasksFeature;