import { Routes } from '@angular/router';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { TodayComponent } from './pages/today/today.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './auth/auth.guard';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'project/:id', component: ProjectPageComponent, canActivate: [authGuard] },
    { path: 'register', component: RegisterComponent, },
    { path: 'today', component: TodayComponent, canActivate: [authGuard]  },
    { path: '**', redirectTo: 'today' },
];
