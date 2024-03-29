import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Quote } from '../models/quote.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  url = environment.baseUrl + '/quotes';

  constructor(private http: HttpClient) { }

  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.url);
  }

  createQuote(quote: Quote): Observable<Quote> {
    return this.http.post<Quote>(this.url, quote);
  }

  updateQuote(id: string, values: Partial<Quote>): Observable<Quote> {
    return this.http.patch<Quote>(`${this.url}/${id}`, values);
  }

  deleteQuote(id: string): Observable<any> {
    return this.http.delete<Quote>(`${this.url}/${id}`);
  }
}
