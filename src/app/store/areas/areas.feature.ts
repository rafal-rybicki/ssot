import { createFeature, createReducer, on } from '@ngrx/store';
import { Area } from '../../models/area';
import { AreasApiActions } from './areas-api.actions';
  
const initialState: Area[] = []

export const areasFeature = createFeature({
    name: 'areas',
    reducer: createReducer(
        initialState,
        on(
            AreasApiActions.areasLoadedSuccess,
            (state, { areas }) => [...areas]
        ),
        on(
            AreasApiActions.areaAddedSuccess,
            (state, { area }) => [...state, area]
        ),
        on(
            AreasApiActions.areaDeletedSuccess,
            (state, { areaId }) => [...state.filter(area => area.id !== areaId)]
        ),
        on(
            AreasApiActions.areaUpdatedSuccess,
            (state, { area }) => [...state.map((a) => a.id === area.id ? area : a)]
        )
    )
})

export const {
    name,
    reducer,
    selectAreasState,
} = areasFeature;