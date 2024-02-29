import { Injectable } from "@angular/core";
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from "@ngrx/effects";
import { AreaService } from "../../services/area.service";
import { AreasApiActions } from "./areas-api.actions";
import { EMPTY, catchError, exhaustMap, map } from "rxjs";
import { addArea, deleteArea, updateArea } from "./areas.actions";

@Injectable()
export class AreasEffects {
    loadAreas$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            exhaustMap(() => this.areaService.getAreas()
                .pipe(
                    map(areas => AreasApiActions.areasLoadedSuccess({ areas })),
                    catchError(() => EMPTY)
                )
            )
        )
    )

    addArea$ = createEffect(() => 
        this.actions$.pipe(
            ofType(addArea),
            exhaustMap(({ area }) => this.areaService.createArea(area)
                .pipe(
                    map(area => AreasApiActions.areaAddedSuccess({ area })),
                    catchError(() => EMPTY)
                )
            )
        )
    )

    deleteArea$ = createEffect(() => 
        this.actions$.pipe(
            ofType(deleteArea),
            exhaustMap(({ areaId }) => this.areaService.deleteArea(areaId)
                .pipe(
                    map(area => AreasApiActions.areaDeletedSuccess({ areaId: area.id })),
                    catchError(() => EMPTY)
                )
            )
        )
    )

    updateArea$ = createEffect(() => 
        this.actions$.pipe(
            ofType(updateArea),
            exhaustMap(({ areaId, values }) => this.areaService.updateArea(areaId, values)
                .pipe(
                    map(area => AreasApiActions.areaUpdatedSuccess({ area })),
                    catchError(() => EMPTY)
                )
            )
        )
    )

    constructor(
        private actions$: Actions,
        private areaService: AreaService
    ) {}
}