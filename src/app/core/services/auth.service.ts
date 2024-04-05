import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private _accessToken = signal<string>('find backend developer');

  private url = '/auth/' ;

  isLoggedIn = computed(() => !!this._accessToken());

  authenticate = effect(() => {
    if (this.isLoggedIn()) {
      this.router.navigateByUrl('today'); 
    } else {
      this.router.navigateByUrl('login'); 
    }
  })

  constructor() {
    const access: string = localStorage.getItem('access') || '';
    this.setAccessToken(access)
  }

  login(email: string, password: string): Observable<void | string> {
    return this.http.post<AuthResponse>(this.url + 'login', {
      email,
      password 
    }).pipe(
      map(response => {
        this.setAccessToken(response.accessToken);
      }),
      catchError(err => {
        return of(err.error.message);
      })
    )
  }  

  logout() {
    this.setAccessToken('');
  }

  register(email: string, password: string, username: string): Observable<void | string> {
    return this.http.post<AuthResponse>(this.url + 'register', {
      email,
      password,
      username
    }).pipe(
      map(response => {
        this.setAccessToken(response.accessToken);
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
    return this._accessToken;
  }

  private setAccessToken(access: string) {
    localStorage.setItem('access', access);
    this.accessToken.set(access);
  }
}

interface AccessToken {
  accessToken: string;
}

interface AuthResponse {
  id: number;
  email: string;
  username: string;
  accessToken: string;
}