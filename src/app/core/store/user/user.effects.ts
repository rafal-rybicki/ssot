import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { UserApiActions } from './user-api.actions';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';


@Injectable()
export class UserEffects {
  userLoadedSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      tap(() => {
        const user = localStorage.getItem('user');
        if (user) {
          this.store.dispatch(UserApiActions.userLoadedSuccess({ user: JSON.parse(user) }));
        }
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store
  ) {}
}