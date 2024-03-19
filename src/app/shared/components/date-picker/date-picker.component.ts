import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent {
  private calendarService = inject(CalendarService);

  @Input() date?: string;
  @Output() onSave = new EventEmitter<string>();

  selectedDate = this.date || this.calendarService.getToday().date;

  setDate(date: string) {
    this.selectedDate = date;
  }

  clear() {
    this.onSave.emit('');
  }

  save() {
    this.onSave.emit(this.selectedDate);
  }
}
