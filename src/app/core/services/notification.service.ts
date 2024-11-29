import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationResponse } from '../../shared/models/notification-response';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getNotifications(): Observable<NotificationResponse[]> {
    return this.http.get<NotificationResponse[]>(`https://run.mocky.io/v3/2841714e-eedd-4dd7-84c2-5ef3656e2adb
`);
  }
  
}
