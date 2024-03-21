import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Habit } from '../models/habit.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private http = inject(HttpClient);

  url = environment.baseUrl + '/habits';

  getHabits(): Observable<Habit[]> {
    return this.http.get<Habit[]>(this.url);
  }

  createHabit(habit: Habit): Observable<Habit> {
    return this.http.post<Habit>(this.url, habit);
  }

  updateHabit(id: string, values: Partial<Habit>): Observable<Habit> {
    return this.http.patch<Habit>(`${this.url}/${id}`, values);
  }

  deleteHabit(id: string): Observable<any> {
    return this.http.delete<Habit>(`${this.url}/${id}`);
  }
}
