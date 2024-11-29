import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CardEventComponent } from '../../shared/components/card-event/card-event.component';
import { EventService } from '../../core/services/event.service';
import { EventConsoleResponse } from '../../shared/models/event-console-response';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-event-managment',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, 
    MatToolbar,MatButtonModule,CardEventComponent, NgFor, MatInputModule, MatSelectModule,
  FormsModule],
  templateUrl: './event-managment.component.html',
  styleUrl: './event-managment.component.css'
})
export class EventManagmentComponent implements OnInit{

  options: string[] = ['Proximos', 'Pasados'];
  filteredOptions: string[] = this.options;
  searchTerm: string = '';
  events: EventConsoleResponse[] = [];
  selectedFilter: string = 'Proximos'; // Opción seleccionada por defecto
  filteredEvents: EventConsoleResponse[] = [];

  trackEvent = (index: number, event: any) => event.id;

  private eventService = inject(EventService);
  private router = inject(Router);
  private authService = inject(AuthService);

  filterOptions() {
    this.filteredOptions = this.options.filter(option =>
      option.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

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


  filterEvents(): void {

    var currentDate = new Date();  // Fecha actual
    const nowMillis = currentDate.getTime();
    
    console.log("Fecha actual (UTC):", nowMillis);
  
    if (this.selectedFilter === 'Proximos') {
      // Filtrar eventos futuros (proximos)
      this.filteredEvents = this.events.filter(event => {
        const eventDate = new Date(`${event.date}T${event.time}`); // Combina y crea un Date
        const targetMillis  = eventDate.getTime();
  
        return nowMillis < targetMillis; // Filtrar eventos futuros (comparando en hora UTC)
      });
    } else if (this.selectedFilter === 'Pasados') {
      // Filtrar eventos pasados
      this.filteredEvents = this.events.filter(event => {
        const eventDate = new Date(`${event.date}T${event.time}`); // Combina y crea un Date
        const targetMillis  = eventDate.getTime();
  
        return nowMillis >= targetMillis; // Filtrar eventos pasados (comparando en hora UTC)
      });
    }
  }
  

  onFilterChange(): void {
    this.filterEvents(); // Aplicar el filtro
  }

  editEvent(eventId: number) {
    this.router.navigate(['/event-edit', eventId]);
  }
}
