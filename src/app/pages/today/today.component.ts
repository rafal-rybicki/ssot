import { Component, inject } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { TaskComponent } from '../../components/task/task.component';
import { TaskNewComponent } from '../../components/task-new/task-new.component';
import { Store, select } from '@ngrx/store';
import { selectTasksState } from '../../store/tasks/tasks.feature';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [TaskComponent, TaskNewComponent, CommonModule],
  templateUrl: './today.component.html',
  styleUrl: './today.component.scss',
  host: {
    '[class]': "'main-container'",
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
}