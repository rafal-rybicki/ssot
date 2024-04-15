import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Habit } from '../models/habit.model';
import { Observable } from 'rxjs';
import { HabitPayload } from '../models/habit-payload.model';
import { AuthService } from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private auth = inject(AuthService);
  private http = inject(HttpClient);

  url = 'api/habits';

  getHabits(): Observable<Habit[]> {
    return this.http.get<Habit[]>(this.url, this.auth.getAuthHeaders);
  }

  createHabit(HabitPayload: HabitPayload): Observable<Habit> {
    return this.http.post<Habit>(this.url, HabitPayload, this.auth.getAuthHeaders);
  }

  updateHabit(id: number, values: Partial<Habit>): Observable<Habit> {
    return this.http.patch<Habit>(`${this.url}/${id}`, values, this.auth.getAuthHeaders);
  }

  deleteHabit(id: number): Observable<any> {
    return this.http.delete<Habit>(`${this.url}/${id}`, this.auth.getAuthHeaders);
  }
}
