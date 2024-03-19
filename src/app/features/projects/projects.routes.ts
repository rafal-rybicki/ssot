import { Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ProjectComponent } from './components/project/project.component';
import { authGuard } from '../../core/guards/auth.guard';

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
