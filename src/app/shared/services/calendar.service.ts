import { Injectable } from '@angular/core';
import { Today } from '../../features/today/today.model';
import { CalendarDate } from '../models/calendar-date.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  getToday(): Today {
    const day = this.getCurrentDay();
    const month = this.getCurrentMonth();
    const year = this.getCurrentYear();

    return {
      date: `${year}-${month}-${day}`,
      day,
      month: this.getMonthName(month),
      year
    }
  }

  getCurrentDay(): number {
    return new Date().getDate();
  }

  getCurrentMonth(): number {
    return new Date().getMonth() + 1;
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  getDaysOfMonth(year: number, month: number): CalendarDate[] {
    const daysInMonth = this.getDaysInMonth(year, month);

    return Array(daysInMonth).fill(0).map((x,i) => ({
      day: i + 1,
      value: `${year}-${month}-${i+1}`
    }));
  }

  getMonthName(month: number): string {
    return months[month - 1];
  }

  getOffset(year: number, month: number): number  {
    return this.getDayOfWeek(year, month, 1) - 1;
  }

  private getDate(year: number, month: number, day: number): Date {
    return new Date(year, month - 1, day);
  }

  private getDayOfWeek(year: number, month: number, day: number): number {
    const dayOfWeek = this.getDate(year, month, day).getDay();

    return dayOfWeek === 0 ? 7 : dayOfWeek;
  }

  private getDaysInMonth(year: number, month: number): number {
    return this.getDate(year, month + 1, 0).getDate();
  }
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday ', 'Friday', 'Saturday', 'Sunday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October', 'November', 'December'];