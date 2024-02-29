import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { areasFeature } from './store/areas/areas.feature';
import { projectsFeature } from './store/projects/projects.feature';
import { tasksFeature } from './store/tasks/tasks.feature';
import { AreasEffects } from './store/areas/areas.effects';
import { ProjectsEffects } from './store/projects/projects.effects';
import { TasksEffects } from './store/tasks/tasks.effects';

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
