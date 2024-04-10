import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';
import { AccessToken } from '../models/access-token.model';
import { Store } from '@ngrx/store';
import { loadUsersData } from '../store/user/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private store = inject(Store);
  private router = inject(Router);

  private _accessToken = signal<string>('');
  private _userId = signal<number>(0);
  private url = '/auth/' ;

  isLoggedIn = computed(() => !!this._accessToken());
  userId = computed(() => this._userId());

  authenticate = effect(() => {
    if (this.isLoggedIn()) {
      this.router.navigateByUrl('today'); 
    } else {
      this.router.navigateByUrl('login'); 
    }
  })

  constructor() {
    const accessToken: string = localStorage.getItem('accessToken') || '';
    this.setAccessToken(accessToken);

    const userId = localStorage.getItem('userId');
    if (userId) {
      this.setUserId(Number(userId));
    }
  }

  login(email: string, password: string): Observable<void | string> {
    return this.http.post<AuthResponse>(this.url + 'login', {
      email,
      password 
    }).pipe(
      map(response => {
        this.setAccessToken(response.accessToken);
        this.setUserId(response.id);
        this.store.dispatch(loadUsersData());
      }),
      catchError(err => {
        return of(err.error.message);
      })
    )
  }  

  logout() {
    this.setAccessToken('');
    this.setUserId(0);
  }

  register(email: string, password: string, username: string): Observable<void | string> {
    return this.http.post<AuthResponse>(this.url + 'register', {
      email,
      password,
      username
    }).pipe(
      map(response => {
        this.setAccessToken(response.accessToken);
        this.setUserId(response.id);
      }),
      catchError(err => {
        return of(err.error.message);
      })
    )
  }

  refreshToken(): void | Observable<void | string> {
    return this.http.post<AccessToken>(this.url + 'refresh', {}).pipe(
      map(response => {
        this.setAccessToken(response.accessToken)
      }),
      catchError(err => {
        return of(err.error.message)
      })
    )
  }

  get accessToken() {
    return this._accessToken();
  }

  get getAuthHeaders() {
    return { 
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    }
  }

  private setAccessToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
    this._accessToken.set(accessToken);
  }

  private setUserId(userId: number) {
    localStorage.setItem('userId', userId.toString());
    this._userId.set(userId);
  }
}