import { createActionGroup, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

export const TasksApiActions = createActionGroup({
    source: 'Tasks API',
    events: {
        taskAddedSuccess: props<{ task: Task }>(),
        taskAddedFailure: props<{ errorMsg: string }>(),
        taskDeletedSuccess: props<{ taskId: string }>(),
        taskDeletedFailure: props<{ errorMsg: string }>(),
        taskUpdatedSuccess: props<{ task: Task }>(), 
        taskUpdatedFailure: props<{ errorMsg: string }>(),
        tasksLoadedSuccess: props<{ tasks: Task[] }>(),
        tasksLoadedFailure: props<{ errorMsg: string }>()
    }
});