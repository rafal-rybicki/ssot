import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  url = environment.baseUrl + '/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.url, task);
  }

  updateTask(id: string, values: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.url}/${id}`, values);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete<Task>(`${this.url}/${id}`);
  }
}