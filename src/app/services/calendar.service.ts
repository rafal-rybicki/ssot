import { Injectable } from '@angular/core';
import { CalendarMonth } from '../models/calendar-month.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  getMonth(year: number, month: number): CalendarMonth {
    const daysInMonth = this.getDaysInMonth(year, month);
    const offset = this.getDayOfWeek(year, month, 1) - 1;

    const days = Array(daysInMonth).fill(null).map((el, i) => ({
      day: i + 1,
      date: `${year}-${month}-${i + 1}`
    }));

    return {
      days,
      name: months[month - 1],
      offset
    }
  }

  private getDate(year: number, month: number, day: number): Date {
    return new Date(year, month - 1, day);
  }

  private getDaysInMonth(year: number, month: number): number {
    return this.getDate(year, month + 1, 0).getDate();
  }

  private getDayOfWeek(year: number, month: number, day: number): number {
    const dayOfWeek = this.getDate(year, month, day).getDay();

    return dayOfWeek === 0 ? 7 : dayOfWeek;
  }
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday ', 'Friday', 'Saturday', 'Sunday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October', 'November', 'December'];
