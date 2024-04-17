import { Component, inject } from '@angular/core';
import { CalendarService } from '../../shared/services/calendar.service';
import { TaskComponent } from '../tasks/components/task/task.component';
import { TaskNewComponent } from '../tasks/components/task-new/task-new.component';
import { Store, select } from '@ngrx/store';
import { selectTasksState } from '../tasks/store/tasks.feature';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HabitTaskComponent } from './components/habit-task/habit-task.component';
import { selectTodayHabits } from '../habits/store/habits.feature';

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

  habits$ = this.store.pipe(select(selectTodayHabits))
}