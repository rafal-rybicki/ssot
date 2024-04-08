import { Injectable, inject } from '@angular/core';
import { Project } from '../models/project.model';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private auth = inject(AuthService);
  private http = inject(HttpClient);

  url = 'api/projects';

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url, this.auth.getAuthHeaders);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.url, project, this.auth.getAuthHeaders);
  }

  updateProject(id: string, values: Partial<Project>): Observable<Project> {
    return this.http.patch<Project>(`${this.url}/${id}`, values, this.auth.getAuthHeaders);
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete<Project>(`${this.url}/${id}`, this.auth.getAuthHeaders);
  }
}