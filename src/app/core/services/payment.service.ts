import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/api/payment`;

  constructor(private http: HttpClient) {}

  createPayment(amount: number, eventId: number, userId: number): Observable<any> {
    const paymentData = {
      amount: amount,
      eventId: eventId,
      userId: userId,
      paymentStatus: 'PENDING'
    };
    return this.http.post(`${this.apiUrl}/create`, paymentData);
  }

  checkUserRegistration(userId: number, eventId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/registration/check`, {
      params: { userId: userId.toString(), eventId: eventId.toString() }
    });
  }
}
