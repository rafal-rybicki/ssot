import { Routes } from '@angular/router';
import { TodayComponent } from './pages/today/today.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './auth/auth.guard';
import { HabitsComponent } from './pages/habits/habits.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { InboxComponent } from './pages/inbox/inbox.component';
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
