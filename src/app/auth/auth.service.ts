import { Injectable, Signal, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);

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

  login(email: string, password: string) {
    if (password === 'password123') {
      this.isAuthenticated.set(true);
      this.setAuthSecretKey();
      return { status: true };
    } else {
      return {
        status: false,
        msg: 'Something went wrong'
      };
    }
  }

  logout() {
    localStorage.removeItem(this.authSecretKey);
    this.isAuthenticated.set(false);
  }

  register(email: string, password: string, username: string) {
    this.setAuthSecretKey();
  }

  private setAuthSecretKey() {
    localStorage.setItem(this.authSecretKey, this.token);
  }
}