import { Component, EventEmitter, Inject, Input, Output, SimpleChanges, inject } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { Task } from '../../models/task.model';
import { CalendarService } from '../../services/calendar.service';
import { Store } from '@ngrx/store';
import { updateTask } from '../../store/tasks/tasks.actions';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CalendarComponent, IconButtonComponent],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent {
  private calendarService = inject(CalendarService);
  private store = inject(Store);

  @Input() date?: string | null;
  @Input({ required: true}) id!: string;
  @Output() update = new EventEmitter<Partial<Task>>();

  showCalendar = false;
  day: number | null = null;
  month!: number;
  year!: number;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['date'].currentValue !== changes['date'].previousValue) {
      if (this.date) {
        [this.year, this.month, this.day] = this.date.split('-').map(string => Number(string));
      } else {
        this.day = null
        this.month = this.calendarService.getCurrentMonth();
        this.year = this.calendarService.getCurrentYear();
      }
    }
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  setDate(date: string) {
    this.toggleCalendar();
    this.store.dispatch(updateTask({ taskId: this.id, values: { date } }))
  }
}