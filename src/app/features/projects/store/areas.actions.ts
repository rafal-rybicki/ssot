import { createAction, props } from '@ngrx/store';
import { Area } from '../models/area.model';

export const addArea = createAction('[AreaEditor Component] Add', props<{ area: Area }>());
export const deleteArea = createAction('[Area Component] Delete', props<{ areaId: number }>());
export const updateArea = createAction('[Area Component] Update', props<{ areaId: number, values: Partial<Area> }>());