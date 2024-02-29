import { createActionGroup, props } from '@ngrx/store';
import { Area } from '../../models/area';

export const AreasApiActions = createActionGroup({
    source: 'Areas API',
    events: {
        areaAddedSuccess: props<{ area: Area }>(),
        areaAddedFailure: props<{ errorMsg: string }>(),
        areaDeletedSuccess: props<{ areaId: number }>(),
        areaDeletedFailure: props<{ errorMsg: string }>(),
        areaUpdatedSuccess: props<{ area: Area }>(), 
        areaUpdatedFailure: props<{ errorMsg: string }>(),
        areasLoadedSuccess: props<{ areas: Area[] }>(),
        areasLoadedFailure: props<{ errorMsg: string }>()
    }
});