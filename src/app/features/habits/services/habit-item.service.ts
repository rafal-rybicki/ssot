import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HabitItem } from '../models/habit-item.model';

@Injectable({
  providedIn: 'root'
})
export class HabitItemService {
  private http = inject(HttpClient);

  url = 'api/habit-items';

  getHabitItems(): Observable<HabitItem[]> {
    return this.http.get<HabitItem[]>(this.url);
  }

  createHabitItem(habitItem: HabitItem): Observable<HabitItem> {
    return this.http.post<HabitItem>(this.url, habitItem);
  }

  updateHabitItem(id: string, values: Partial<HabitItem>): Observable<HabitItem> {
    return this.http.patch<HabitItem>(`${this.url}/${id}`, values);
  }
}
