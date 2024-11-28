import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mockStorage: { [key: string]: string } = {};
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    this.mockStorage['token'] = '';
  }

  login(email: string, password: string): boolean {
    // Simulamos una autenticación básica
    if (email === 'admin@gmail.com' && password === 'admin') {
      this.mockStorage['token'] = 'mock-token-123';
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    this.mockStorage['token'] = '';
    this.isAuthenticatedSubject.next(false);
  }

  getToken(): string {
    return this.mockStorage['token'];
  }
}