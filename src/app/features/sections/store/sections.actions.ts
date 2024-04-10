import { createAction, props } from '@ngrx/store';
import { SectionPayload } from '../models/section-payload.model';
import { Section } from '../models/section.model';

export const addSection = createAction('[SectionEditor Component] Add', props<{ sectionPayload: SectionPayload }>());
export const updateSection = createAction('[SectionEditor Component] Update', props<{ sectionId: number, values: Partial<Section> }>());
export const deleteSection = createAction('[Project Component] Delete Section', props<{ projectId: number, sectionId: number }>());