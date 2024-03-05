import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  getCurrentMonth(): number {
    return new Date().getMonth() + 1;
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  getDaysOfMonth(year: number, month: number): number[] {
    const daysInMonth = this.getDaysInMonth(year, month);

    return Array(daysInMonth).fill(0).map((x,i) => i + 1);
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
