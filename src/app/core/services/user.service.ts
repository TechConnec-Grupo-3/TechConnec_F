import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Obtener usuario por ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/admin/users/${id}`);
  }

  // Crear nuevo usuario (registro)
  createUser(userData: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, userData);
  }

  // Login de usuario
  loginUser(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, credentials);
  }

  // Actualizar datos de usuario
  updateUser(userId: number, userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${userId}`, userData);
  }

  // Obtener lista de usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  // Eliminar usuario
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/users${userId}`);
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  
  updateUserProfile(userId: number, profileData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/users/${userId}`, profileData);
  }
}
