import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { TodayComponent } from './features/today/today.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { HabitsComponent } from './features/habits/habits.component';
import { SettingsComponent } from './features/settings/settings.component';
import { InboxComponent } from './features/inbox/inbox.component';
import { projectRoutes } from './features/projects/projects.routes';


export const routes: Routes = [
    { path: 'habits', component: HabitsComponent, canActivate: [authGuard] },
    { path: 'inbox', component: InboxComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    // { path: 'register', component: RegisterComponent, },
    { path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
    { path: 'today', component: TodayComponent, canActivate: [authGuard]  },
    ...projectRoutes,
    { path: '**', redirectTo: 'today' },
];
