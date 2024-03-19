import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { areasFeature } from './features/projects/store/areas.feature';
import { projectsFeature } from './features/projects/store/projects.feature';
import { tasksFeature } from './features/tasks/store/tasks.feature';
import { AreasEffects } from './features/projects/store/areas.effects';
import { ProjectsEffects } from './features/projects/store/projects.effects';
import { TasksEffects } from './features/tasks/store/tasks.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
    provideStore(),
    provideState(areasFeature),
    provideState(projectsFeature),
    provideState(tasksFeature),
    provideEffects(
      AreasEffects,
      ProjectsEffects,
      TasksEffects
    ),
    provideStoreDevtools({
        maxAge: 25,
        logOnly: !isDevMode()
    }),
    provideEffects()
]
};
