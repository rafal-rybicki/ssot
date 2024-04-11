import { createAction, props } from '@ngrx/store';
import { AreaPayload } from '../models/area-payload';
import { Area } from '../models/area.model';

export const addArea = createAction('[AreaEditor Component] Add', props<{ areaPayload: AreaPayload }>());
export const deleteArea = createAction('[Area Component] Delete', props<{ areaId: number }>());
export const updateArea = createAction('[Area Component] Update', props<{ areaId: number, values: Partial<Area> }>());