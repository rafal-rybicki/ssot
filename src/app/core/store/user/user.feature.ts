import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import { UserApiActions } from './user-api.actions';
  
const initialState: User = {} as User;

export const userFeature = createFeature({
    name: 'user',
    reducer: createReducer(
        initialState,
        on(
            UserApiActions.userLoadedSuccess,
            ( state, { user } ) => { 
                console.log(user);
                return user
            }
        ),
        // on(
        //     UserApiActions.userDeletedSuccess,
        //     (state, { userId }) => [...state.filter(user => user.id !== userId)]
        // ),
        on(
            UserApiActions.userUpdatedSuccess,
            (state) => state
        ),
    ),
    extraSelectors: ({ selectUserState }) => ({
        selectUserId: createSelector(
            selectUserState,
            (user) => user.id
        )
    })
})

export const {
    name,
    reducer,
    selectUserState,
    selectUserId,
} = userFeature;