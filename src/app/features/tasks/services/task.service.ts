import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { TaskPayload } from '../models/task-payload';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private auth = inject(AuthService);
  private http = inject(HttpClient);

  url = 'api/tasks';

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url, this.auth.getAuthHeaders);
  }

  createTask(taskPayload: TaskPayload): Observable<Task> {
    return this.http.post<Task>(this.url, taskPayload, this.auth.getAuthHeaders);
  }

  updateTask(id: number, values: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.url}/${id}`, values, this.auth.getAuthHeaders);
  }

  deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.url}/${id}`, this.auth.getAuthHeaders);
  }
}