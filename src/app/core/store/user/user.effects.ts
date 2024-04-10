import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { loadUsersData } from './user.actions';


@Injectable()
export class UserEffects {
  userLoadedSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      tap(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
          this.store.dispatch(loadUsersData());
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