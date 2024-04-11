import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { TodayComponent } from './features/today/today.component';
import { SettingsComponent } from './features/settings/settings.component';
import { InboxComponent } from './features/inbox/inbox.component';
import { projectsRoutes } from './features/projects/projects.routes';
import { authRoutes } from './features/auth/auth.routes';
import { habitRoutes } from './features/habits/habits.routes';

export const routes: Routes = [
    { path: 'inbox', component: InboxComponent, canActivate: [authGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
    { path: 'today', component: TodayComponent, canActivate: [authGuard]  },
    ...authRoutes,
    ...habitRoutes,
    ...projectsRoutes,
    { path: '**', redirectTo: 'today' },
];
