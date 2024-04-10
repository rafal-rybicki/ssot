import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, exhaustMap, map } from 'rxjs';
import { SectionService } from '../services/section.service';
import { addSection, deleteSection, updateSection } from './sections.actions';
import { SectionsApiActions } from './sections-api.actions';

@Injectable()
export class SectionsEffects {
    addSection$ = createEffect(() => 
        this.actions$.pipe(
            ofType(addSection),
            exhaustMap(({ sectionPayload }) => this.sectionService.createSection(sectionPayload)
                .pipe(
                    map(section => SectionsApiActions.sectionAddedSuccess({ section })),
                    catchError((err) => {
                        console.log(err);
                        return EMPTY;
                    })
                )
            )
        )
    )

    deleteSection$ = createEffect(() => 
        this.actions$.pipe(
            ofType(deleteSection),
            exhaustMap(({ sectionId }) => this.sectionService.deleteSection(sectionId)
                .pipe(
                    map(section => SectionsApiActions.sectionDeletedSuccess({ 
                        sectionId: section.id,
                        projectId: section.projectId
                    })),
                    catchError(() => EMPTY)
                )
            )
        )
    )

    updateSection$ = createEffect(() => 
        this.actions$.pipe(
            ofType(updateSection),
            exhaustMap(({ sectionId, values }) => this.sectionService.updateSection(sectionId, values)
                .pipe(
                    map(section => SectionsApiActions.sectionUpdatedSuccess({ section })),
                    catchError(() => EMPTY)
                )
            )
        )
    )

    constructor(
        private actions$: Actions,
        private sectionService: SectionService,
    ) {}
}