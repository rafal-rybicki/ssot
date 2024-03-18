import { Routes } from '@angular/router';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { TodayComponent } from './pages/today/today.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './auth/auth.guard';
import { HabitsComponent } from './pages/habits/habits.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { InboxComponent } from './pages/inbox/inbox.component';


export const routes: Routes = [
    { path: 'habits', component: HabitsComponent, canActivate: [authGuard] },
    { path: 'inbox', component: InboxComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'project/:id', component: ProjectPageComponent, canActivate: [authGuard] },
    // { path: 'register', component: RegisterComponent, },
    { path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
    { path: 'today', component: TodayComponent, canActivate: [authGuard]  },
    { path: '**', redirectTo: 'today' },
];
