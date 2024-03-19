import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { TodayComponent } from './features/today/today.component';
import { HabitsComponent } from './features/habits/habits.component';
import { SettingsComponent } from './features/settings/settings.component';
import { InboxComponent } from './features/inbox/inbox.component';
import { projectRoutes } from './features/projects/projects.routes';
import { authRoutes } from './features/auth/auth.routes';

export const routes: Routes = [
    { path: 'habits', component: HabitsComponent, canActivate: [authGuard] },
    { path: 'inbox', component: InboxComponent, canActivate: [authGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
    { path: 'today', component: TodayComponent, canActivate: [authGuard]  },
    ...authRoutes,
    ...projectRoutes,
    { path: '**', redirectTo: 'today' },
];
