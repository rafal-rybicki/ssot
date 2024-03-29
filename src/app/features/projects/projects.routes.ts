import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { ProjectsComponent } from './projects.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import { ProjectNewComponent } from './components/project-new/project-new.component';

export const projectRoutes: Routes = [
    { 
        path: 'projects',
        canActivate: [authGuard],
        component: ProjectsComponent,
        children: [
            {
                path: 'new',
                component: ProjectNewComponent
            },
            {
                path: 'edit/:id',
                component: ProjectEditComponent
            },
            {
                path: ':id',
                component: ProjectComponent
            }
        ]
    },
];
