import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { IconButtonComponent } from '../../icon-button/icon-button.component';
import { CalendarService } from '../../../services/calendar.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [IconButtonComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  private calendarService = inject(CalendarService);

  @Input() initialDay: number | null = null;
  @Input({ required: true }) initialMonth!: number;
  @Input({ required: true }) initialYear!: number;
  @Output() onSelect = new EventEmitter<string>();
  
  selectedDay!: number | null;
  selectedMonth!: number;
  selectedYear!: number;
  days!: number[];
  monthName!: string;
  offset!: number;
  
ngOnInit(){
  this.selectedDay = this.initialDay;
  this.selectedMonth = this.initialMonth;
  this.selectedYear = this.initialYear;
  this.days = this.calendarService.getDaysOfMonth(this.selectedYear, this.selectedMonth);
  this.monthName = this.calendarService.getMonthName(this.selectedMonth);
  this.offset = this.calendarService.getOffset(this.selectedYear, this.selectedMonth) * 30;
}
  
  next() {
    if (this.selectedMonth == 12) {
      ++this.selectedYear;
      this.selectedMonth = 1;
    } else {
      ++this.selectedMonth;
    }

    this.setMonth();
  }

  prev() {
    if (this.selectedMonth == 1) {
      --this.selectedYear;
      this.selectedMonth = 12;
    } else {
      --this.selectedMonth;
    }

    this.setMonth();
  }

  reset() {
    this.selectedDay = this.initialDay;
    this.selectedMonth = this.initialMonth;
    this.selectedYear = this.initialYear;
    this.setMonth();
  }

  selectDay(day: number) {
    if (this.selectedDay === day) {
      this.onSelect.emit('')
    } else {
      const selectedDate = `${this.selectedYear}-${this.selectedMonth}-${day}`
      this.onSelect.emit(selectedDate)
    }
  }

  private setMonth() {
    this.days = this.calendarService.getDaysOfMonth(this.selectedYear, this.selectedMonth);
    this.monthName = this.calendarService.getMonthName(this.selectedMonth);
    this.offset = this.calendarService.getOffset(this.selectedYear, this.selectedMonth) * 30;
  }
}