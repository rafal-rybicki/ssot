import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HabitItem } from '../models/habit-item.model';
import { AuthService } from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HabitItemService {
  private auth = inject(AuthService);
  private http = inject(HttpClient);

  url = 'api/habit-items';

  getHabitItems(): Observable<HabitItem[]> {
    return this.http.get<HabitItem[]>(this.url, this.auth.getAuthHeaders);
  }

  updateOrCreateHabitItem(habitItem: HabitItem): Observable<HabitItem> {
    const payload = { ...habitItem };
    
    if (payload.currentValue === payload.dailyTarget) {
      payload.currentValue = 0;
    } else {
      payload.currentValue++;
    }

    return this.http.post<HabitItem>(this.url, payload, this.auth.getAuthHeaders);
  }
}
