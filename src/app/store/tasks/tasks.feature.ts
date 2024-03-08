import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
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
    ),
    extraSelectors: ({ selectTasksState }) => {
        const selectTasksBySectionId = createSelector(
            selectTasksState,
            (tasks) => tasks.reduce((acc: any, task: Task) => {
                if(task.sectionId) {
                    if (acc[task.sectionId]) {
                        acc[task.sectionId].push(task)
                    } else {
                        acc[task.sectionId] = [task]
                    }
                }
                return acc;
            }, {})
        )
        return { selectTasksBySectionId }
    }
})

export const {
    name,
    reducer,
    selectTasksState,
    selectTasksBySectionId,
} = tasksFeature;