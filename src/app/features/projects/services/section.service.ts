import { Injectable, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Section } from '../models/section.model';
import { SectionPayload } from '../models/section-payload.model';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private auth = inject(AuthService);
  private http = inject(HttpClient);

  url = 'api/sections';

  createSection(sectionPayload: SectionPayload): Observable<Section> {
    return this.http.post<Section>(this.url, sectionPayload, this.auth.getAuthHeaders);
  }

  updateSection(id: number, values: Partial<Section>): Observable<Section> {
    return this.http.patch<Section>(`${this.url}/${id}`, values, this.auth.getAuthHeaders);
  }

  deleteSection(id: number): Observable<Section> {
    return this.http.delete<Section>(`${this.url}/${id}`, this.auth.getAuthHeaders);
  }
}