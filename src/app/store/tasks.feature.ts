import { createFeature, createReducer, on } from '@ngrx/store';
import { Task } from '../models/task.model';
import * as TasksActions from './tasks.actions';

interface State extends Array<Task> {}
  
const initialState: State = [
    {
        completedSubtasks: 4,
        content: 'task x',
        date: 1708532094837,
        duration: 5,
        id: '1',
        isCompleted: false,
        isTimeSet: false,
        ownerId: '1',
        order: 0,
        priority: false,
        projectId: '1',
        subtasks: 5,
    },
    {
        content: 'task 2',
        date: 1708532094837,
        duration: 5,
        id: '2',
        isCompleted: true,
        isTimeSet: false,
        ownerId: '1',
        order: 0,
        priority: false,
        projectId: '1',
    },
    {
        completedSubtasks: 4,
        content: 'task 3',
        date: 1708532094837,
        duration: 5,
        id: '3',
        isCompleted: false,
        isTimeSet: false,
        ownerId: '1',
        order: 0,
        priority: false,
        projectId: '1',
        subtasks: 5,
    },
    {
        content: 'task 4',
        date: 1708532094837,
        duration: 5,
        id: '4',
        isCompleted: false,
        isTimeSet: false,
        ownerId: '1',
        order: 0,
        priority: false,
        projectId: '1',
    },
    {
        content: 'task from project 2',
        date: 1708532094837,
        duration: 5,
        id: '5',
        isCompleted: false,
        isTimeSet: false,
        ownerId: '1',
        order: 0,
        priority: false,
        projectId: '2',
    }
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