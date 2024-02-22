import { createFeature, createReducer } from '@ngrx/store';
import { Task } from '../models/task.model';

interface State extends Array<Task> {}
  
const initialState: State = [
    {
        allSubtasks: 5,
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
        projectId: '1'
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
        allSubtasks: 5,
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
        projectId: '1'
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
        id: '4',
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
        initialState
    )
})

export const {
    name,
    reducer,
    selectTasksState,
} = tasksFeature;