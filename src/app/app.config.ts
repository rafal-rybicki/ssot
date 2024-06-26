import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { areasFeature } from './features/areas/store/areas.feature';
import { projectsFeature } from './features/projects/store/projects.feature';
import { tasksFeature } from './features/tasks/store/tasks.feature';
import { AreasEffects } from './features/areas/store/areas.effects';
import { ProjectsEffects } from './features/projects/store/projects.effects';
import { TasksEffects } from './features/tasks/store/tasks.effects';
import { HabitsEffects } from './features/habits/store/habits.effects';
import { habitsFeature } from './features/habits/store/habits.feature';
import { habitItemsFeature } from './features/habits/store/habit-items..feature';
import { HabitItemsEffects } from './features/habits/store/habit-items.effects';
import { UserEffects } from './core/store/user/user.effects';
import { SectionsEffects } from './features/sections/store/sections.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
    provideStore(),
    provideState(areasFeature),
    provideState(habitsFeature),
    provideState(habitItemsFeature),
    provideState(projectsFeature),
    provideState(tasksFeature),
    provideEffects(
      AreasEffects,
      HabitsEffects,
      HabitItemsEffects,
      ProjectsEffects,
      SectionsEffects,
      TasksEffects,
      UserEffects
    ),
    provideStoreDevtools({
        maxAge: 25,
        logOnly: !isDevMode()
    }),
    provideEffects()
  ]
};
