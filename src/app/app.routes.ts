import { Routes } from '@angular/router';
import { ProjectPageComponent } from './pages/project-page/project-page.component';


export const routes: Routes = [
    { path: 'project/:id', component: ProjectPageComponent },
    { path: '**', redirectTo: 'project/1' },
];
