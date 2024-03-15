import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private accessToken = signal<string>('');
  private refreshToken = signal<string>('');
  // private isAuthenticated = signal<boolean>(false);

  isLoggedIn = computed(() => !!this.accessToken());

  authenticate = effect(() => {
    if (this.isLoggedIn()) {
      this.router.navigateByUrl('today'); 
    } else {
      this.router.navigateByUrl('login'); 
    }
  })

  constructor() {
    const access: string = localStorage.getItem('access') || '';
    const refresh: string = localStorage.getItem('refresh') || '';
    this.setTokens(access, refresh)
  }

  login(username: string, password: string): Observable<string> {
    return this.http.post<AuthToken>('/auth/token/', {
      username,
      password
    }).pipe(
      map(response => {
        this.setTokens(response.access, response.refresh)
        return 'OK';
      }),
      catchError(err => {
        return of(err.error.detail)
      })
    )
  }

  logout() {
    this.setTokens('', '')
  }

  register(email: string, password: string, username: string): Observable<string> {
    return this.http.post<User>('/auth/register', {
      email,
      password,
      username
    }).pipe(
      map(response => {
        const user = response;
  
        if (user) {
          // this.isAuthenticated.set(true);
          return 'OK';
        } else {
          return 'Something went wrong';
        }
  
        // catchError((err, c) => {
        //   console.log(err);
        //   return 'Something went wrong';
        // })
      })
    )
  }

  private setTokens(access: string, refresh: string) {
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    this.accessToken.set(access);
    this.refreshToken.set(refresh);
  }
}

interface AuthToken {
  access: string;
  refresh: string;
}