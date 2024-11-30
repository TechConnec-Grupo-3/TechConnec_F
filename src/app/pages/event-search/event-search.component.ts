import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CardEventSearchComponent } from "../../shared/components/card-event-search/card-event-search.component";
import { EventConsoleResponse } from '../../shared/models/event-console-response';
import { EventService } from '../../core/services/event.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CardEventComponent } from '../../shared/components/card-event/card-event.component';
import { NgFor } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-search',
  standalone: true,
  imports: [CardEventSearchComponent, MatFormField, MatLabel, MatIcon, MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, 
    MatToolbar,MatButtonModule,CardEventComponent, NgFor, MatInputModule, MatSelectModule,
  FormsModule],
  templateUrl: './event-search.component.html',
  styleUrl: './event-search.component.css'
})
export class EventSearchComponent implements OnInit{
  events: EventConsoleResponse[] = [];
  selectedFilter: string = 'Proximos'; // Opción seleccionada por defecto
  filteredEvents: EventConsoleResponse[] = [];


  trackEvent = (index: number, event: any) => event.id;

  private eventService = inject(EventService);
  private router = inject(Router);
  private authService = inject(AuthService);



  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.eventService.getEventIdList(userId).subscribe({
        next: (event) => {
          this.filteredEvents = event;
        this.events=event
      },
      error: (error) =>
        console.error('Error al cargar las notificaciones recientes', error),
      });
    }
  }

  onDeleteEvent(event: EventConsoleResponse): void {
    this.eventService.deleteEvents(event.id).subscribe({
        next: () => {
            // Filtrar el evento eliminado de la lista
            this.filteredEvents = this.filteredEvents.filter(e => e.id !== event.id);
            this.events = this.events.filter(e => e.id !== event.id); // También actualizar la lista completa si es necesario
        },
        error: (error) => console.error('Error al eliminar el evento', error)
    });
  }

  
}

