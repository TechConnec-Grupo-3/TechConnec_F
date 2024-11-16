import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventConsoleResponse } from '../../shared/models/event-console-response';
import { EventAssistanceResponse } from '../../shared/models/event-assistance-response';
import { Event } from '../../shared/models/event.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEventList(): Observable<EventConsoleResponse[]>{
    return this.http.get<EventConsoleResponse[]>(`${this.apiUrl}/event/5/list`);
  }

  getEventAssistance(): Observable<EventAssistanceResponse[]>{
    return this.http.get<EventAssistanceResponse[]>(`https://run.mocky.io/v3/bc5dcc46-09b3-4dc1-8a49-7db468c1e5e9`);
  }

  getEventById(id: number) {
    return this.http.get<Event>(`${this.apiUrl}/event/${id}`);
  }

  updateEvent(eventData: Event) {
    console.log('Datos enviados al servicio:', eventData);
    return this.http.put<Event>(`${this.apiUrl}/event/${eventData.id}`, eventData);
  }
  
}
