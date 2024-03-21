import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { HabitNewComponent } from './components/habit-new/habit-new.component';
import { HabitEditComponent } from './components/habit-edit/habit-edit.component';
import { HabitComponent } from './components/habit/habit.component';
import { HabitsComponent } from './habits.component';

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
                path: ':id',
                component: HabitComponent
            },
            {
                path: '',
                component: HabitsComponent
            }
        ]
    },
];
