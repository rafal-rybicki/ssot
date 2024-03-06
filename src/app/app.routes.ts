import { Routes } from '@angular/router';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { TodayComponent } from './pages/today/today.component';


export const routes: Routes = [
    { path: 'project/:id', component: ProjectPageComponent },
    { path: 'today', component: TodayComponent },
    { path: '**', redirectTo: 'today' },
];
