import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { HabitNewComponent } from './components/habit-new/habit-new.component';
import { HabitEditComponent } from './components/habit-edit/habit-edit.component';
import { HabitsTableComponent } from './components/habits-table/habits-table.component';

export const habitRoutes: Routes = [
    { 
        path: 'habits',
        canActivate: [authGuard],
        children: [
            {
                path: 'new',
                component: HabitNewComponent
            },
            {
                path: 'edit/:id',
                component: HabitEditComponent
            },
            {
                path: '',
                component: HabitsTableComponent
            }
        ]
    },
];
