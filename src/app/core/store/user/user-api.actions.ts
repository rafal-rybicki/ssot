import { createActionGroup, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const UserApiActions = createActionGroup({
    source: 'User API',
    events: {
        userDeletedSuccess: props<{ userId: number }>(),
        userDeletedFailure: props<{ errorMsg: string }>(),
        userLoadedSuccess: props<{ user: User }>(),
        userLoadedFailure: props<{ errorMsg: string }>(),
        userUpdatedSuccess: props<{ user: User }>(), 
        userUpdatedFailure: props<{ errorMsg: string }>(),
    }
});