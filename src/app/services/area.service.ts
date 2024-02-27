import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Area } from '../models/area';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  url = environment.baseUrl + '/areas';

  constructor(private http: HttpClient) { }

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.url);
  }

  createArea(area: Area): Observable<Area> {
    return this.http.post<Area>(this.url, area);
  }

  updateArea(id: number, values: Partial<Area>): Observable<Area> {
    return this.http.patch<Area>(`${this.url}/${id}`, values);
  }

  deleteArea(id: number): Observable<any> {
    return this.http.delete<Area>(`${this.url}/${id}`);
  }
}
