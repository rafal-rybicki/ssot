import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.url, project);
  }

  updateProject(id: number, values: Partial<Project>): Observable<Project> {
    return this.http.patch<Project>(`${this.url}/${id}`, values);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete<Project>(`${this.url}/${id}`);
  }
}