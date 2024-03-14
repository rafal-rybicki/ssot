import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment.development';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private url = environment.baseUrl + '/users';
  private authSecretKey = 'Bearer Token';
  private token = 'j23eo4fu43-9p3rhgw4iyrwrjhw039r23r';
  private isAuthenticated = signal<boolean>(false);

  isLoggedIn = computed(() => this.isAuthenticated());

  authenticate = effect(() => {
    if (this.isLoggedIn()) {
      this.router.navigateByUrl('today'); 
    } else {
      this.router.navigateByUrl('login'); 
    }
  })

  constructor() {
    this.isAuthenticated.set(!!localStorage.getItem(this.authSecretKey));
  }

  login(email: string, password: string): Observable<string> {
    const query = `?email=${email}&password=${password}`;

    return this.http.get<User[]>(this.url + query).pipe(
      map(response => {
        const user = response[0];

        if(user) {  
          this.isAuthenticated.set(true);
          this.setAuthSecretKey();
          return 'OK';
        } else {
          return 'Invalid password or email';
        }
      })

      // catchError((err, c) => {
      //   console.log(err);
      //   return 'Something went wrong';
      // })
    )
  }

  logout() {
    localStorage.removeItem(this.authSecretKey);
    this.isAuthenticated.set(false);
  }

  register(email: string, password: string, username: string): Observable<string> {
    return this.http.post<User>(this.url, {
      email,
      password,
      username
    }).pipe(
      map(response => {
        const user = response;
  
        if (user) {
          this.isAuthenticated.set(true);
          this.setAuthSecretKey();
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

  private setAuthSecretKey() {
    localStorage.setItem(this.authSecretKey, this.token);
  }
}