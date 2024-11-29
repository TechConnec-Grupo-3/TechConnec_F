import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class PasswordResetService {
    private apiUrl = `${environment.apiUrl}/mail`;
  
    constructor(private http: HttpClient) { }
  
    // 1. Solicitar restablecimiento
    requestPasswordReset(email: string): Observable<any> {
      return this.http.post(`${this.apiUrl}/sendMail`, email);
    }
  
    // 2. Verificar token
    verifyToken(token: string): Observable<boolean> {
      return this.http.get<boolean>(`${this.apiUrl}/reset/check/${token}`);
    }
  
    // 3. Restablecer contraseña
    resetPassword(token: string, newPassword: string): Observable<any> {
      return this.http.post(`${this.apiUrl}/reset/${token}`, newPassword);
    }
  }