import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Area } from '../models/area.model';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  // private auth = inject(AuthService);
  private http = inject(HttpClient);

  private url = '/areas';
  // private headers = new HttpHeaders({
  //   'Authorization': 'Bearer ' + this.auth.accessToken()
  // });

  // getAreas(): Observable<Area[]> {
  //   return this.http.get<Area[]>(this.url, {
  //     headers: this.headers
  //   });
  // }

  // createArea(area: Area): Observable<Area> {
  //   console.log(area)
  //   return this.http.post<Area>(this.url, area, {
  //     headers: this.headers
  //   });
  // }

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.url);
  }

  createArea(area: Area): Observable<Area> {
    return this.http.post<Area>(this.url, area);
  }

  updateArea(id: string, values: Partial<Area>): Observable<Area> {
    return this.http.patch<Area>(`${this.url}/${id}`, values);
  }

  deleteArea(id: string): Observable<any> {
    return this.http.delete<Area>(`${this.url}/${id}`);
  }
}