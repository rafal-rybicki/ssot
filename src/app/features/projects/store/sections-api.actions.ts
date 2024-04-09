import { createActionGroup, props } from '@ngrx/store';
import { Section } from '../models/section.model';

export const SectionsApiActions = createActionGroup({
    source: 'Sections API',
    events: {
        sectionAddedSuccess: props<{ section: Section }>(),
        sectionAddedFailure: props<{ errorMsg: string }>(),
        sectionDeletedSuccess: props<{ sectionId: number, projectId: number }>(),
        sectionDeletedFailure: props<{ errorMsg: string }>(),
        sectionUpdatedSuccess: props<{ section: Section }>(), 
        sectionUpdatedFailure: props<{ errorMsg: string }>(),
    }
});