import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  
  constructor(private http: HttpClient) {}

  login(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, credentials);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.token.next(null);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.token.next(token);
  }

  getToken(): string | null {
    return this.token.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}