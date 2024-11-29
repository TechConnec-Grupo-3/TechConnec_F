import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exponent } from '../../shared/models/exponent.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExponentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createExponent(exponent: Exponent): Observable<Exponent> {
    return this.http.post<Exponent>(`${this.apiUrl}/exponent/create`, exponent);
  }
}