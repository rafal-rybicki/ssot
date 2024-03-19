import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { IconButtonComponent } from '../../icon-button/icon-button.component';
import { CalendarService } from '../../../services/calendar.service';
import { CalendarDate } from '../../../models/calendar-date.model';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [IconButtonComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  private calendarService = inject(CalendarService);

  @Input({ required: true }) date!: string;
  @Output() onSelect = new EventEmitter<string>();
  
  selectedDay!: number | null;
  selectedMonth!: number;
  selectedYear!: number;
  days!: CalendarDate[];
  monthName!: string;
  offset!: number;
  
  ngOnInit(){
    this.reset();
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
    [
      this.selectedYear,
      this.selectedMonth,
      this.selectedDay
    ] = this.date!.split('-').map(string => Number(string));

    this.setMonth();
  }

  selectDate(date: string) {
    this.onSelect.emit(date)
  }

  private setMonth() {
    this.days = this.calendarService.getDaysOfMonth(this.selectedYear, this.selectedMonth);
    this.monthName = this.calendarService.getMonthName(this.selectedMonth);
    this.offset = this.calendarService.getOffset(this.selectedYear, this.selectedMonth) * 30;
  }
}