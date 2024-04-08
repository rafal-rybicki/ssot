import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';
import { AccessToken } from '../models/access-token.model';
import { Store } from '@ngrx/store';
import { UserApiActions } from '../store/user/user-api.actions';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private store = inject(Store);
  private router = inject(Router);

  private _accessToken = signal<string>('');
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
    const accessToken: string = localStorage.getItem('accessToken') || '';
    this.setAccessToken(accessToken);
  }

  login(email: string, password: string): Observable<void | string> {
    return this.http.post<AuthResponse>(this.url + 'login', {
      email,
      password 
    }).pipe(
      map(response => {
        this.setAccessToken(response.accessToken);
        this.setUser(response);
      }),
      catchError(err => {
        return of(err.error.message);
      })
    )
  }  

  logout() {
    this.setAccessToken('');
    localStorage.removeItem('user');
  }

  register(email: string, password: string, username: string): Observable<void | string> {
    return this.http.post<AuthResponse>(this.url + 'register', {
      email,
      password,
      username
    }).pipe(
      map(response => {
        this.setAccessToken(response.accessToken);
        this.setUser(response);
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

  private setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.store.dispatch(UserApiActions.userLoadedSuccess({
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    }))
  }
}
