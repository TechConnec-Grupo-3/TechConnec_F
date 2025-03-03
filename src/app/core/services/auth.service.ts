import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs';

import { StorageService } from './storage.service';
import { AuthRequest } from '../../shared/models/auth-request.model';
import { AuthResponse } from '../../shared/models/auth-response.model';
import { RegisterRequest } from '../../shared/models/register-request.model';
import { RegisterResponse } from '../../shared/models/register-response.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = `${environment.apiUrl}/auth`;
  private baseURLregister = `${environment.apiUrl}`;

  private http= inject(HttpClient);
  private storageService = inject(StorageService);

  constructor() { }


  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseURL}/login`, authRequest).pipe(
      tap(response => this.storageService.setAuthData(response))
    );
  }

  register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseURLregister}/admin/users`, registerRequest);
  }

  logout(): void {
    this.storageService.clearAuthData();
  }

  isAuthenticated(): boolean {
    return this.storageService.getAuthData() !== null;
  }

  getUserRole(): string | null {
    const authData = this.storageService.getAuthData();
    return authData ? authData.role : null;
  }

  getUser(): AuthResponse | null {
    const authData = this.storageService.getAuthData();
    return authData ? authData : null;
  }

  getCurrentUserId(): number | null {
    const authData = this.storageService.getAuthData();
    console.log(authData?.id);
    return authData ? authData.id : null;
  }
}
