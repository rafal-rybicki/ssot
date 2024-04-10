import { Component, inject } from '@angular/core';
import { CalendarService } from '../../shared/services/calendar.service';
import { TaskComponent } from '../tasks/components/task/task.component';
import { TaskNewComponent } from '../tasks/components/task-new/task-new.component';
import { Store, select } from '@ngrx/store';
import { selectTasksState } from '../tasks/store/tasks.feature';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { selectHabitItemsState } from '../habits/store/habit-items..feature';
import { HabitTaskComponent } from './components/habit-task/habit-task.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [CommonModule, TaskComponent, TaskNewComponent, HabitTaskComponent],
  templateUrl: './today.component.html',
  styleUrl: './today.component.scss',
  host: {
    class: 'container'
  }
})
export class TodayComponent {
  private calendarService = inject(CalendarService);
  private store = inject(Store);

  today = this.calendarService.getToday();
  date: string = this.today.date;
  day: number = this.today.day;
  month: string = this.today.month;
  year: number = this.today.year;

  tasks$ = this.store.pipe(
    select(selectTasksState),
    map(
      tasks => tasks.filter(task => task.date === this.date)
    )
  )

  habits$ = this.store.pipe(
    select(selectHabitItemsState),
    map(
      habitItems => habitItems.filter(habitItem => habitItem.date === this.date)
    )
  )
}