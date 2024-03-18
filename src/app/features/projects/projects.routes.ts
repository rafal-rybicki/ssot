import { Routes } from '@angular/router';
import { authGuard } from '../../auth/auth.guard';
import { ProjectsComponent } from './projects.component';
import { ProjectComponent } from './components/project/project.component';

export const projectRoutes: Routes = [
    { 
        path: 'projects',
        canActivate: [authGuard],
        component: ProjectsComponent,
        children: [
            {
                path: ':id',
                component:ProjectComponent
            }
        ]
    },
];
