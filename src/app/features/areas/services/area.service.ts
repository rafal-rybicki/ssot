import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Area } from '../models/area.model';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private auth = inject(AuthService);
  private http = inject(HttpClient);

  private url = 'api/areas';

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.url, this.auth.getAuthHeaders);
  }

  createArea(area: Area): Observable<Area> {
    return this.http.post<Area>(this.url, area, this.auth.getAuthHeaders);
  }

  updateArea(id: number, values: Partial<Area>): Observable<Area> {
    return this.http.patch<Area>(`${this.url}/${id}`, values, this.auth.getAuthHeaders);
  }

  deleteArea(id: number): Observable<Area> {
    return this.http.delete<Area>(`${this.url}/${id}`, this.auth.getAuthHeaders);
  }
}