import { Component, inject, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatToolbar } from "@angular/material/toolbar";
import { CardEventComponent } from "../../shared/components/card-event/card-event.component";
import { NgFor } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { FormsModule } from "@angular/forms";
import { EventConsoleResponse } from "../../shared/models/event-console-response";
import { EventService } from "../../core/services/event.service";
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, 
    MatToolbar,MatButtonModule,CardEventComponent, NgFor,MatInputModule, MatSelectModule,
  FormsModule
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit{
  
  @Input() buttonMode: 'view' | 'edit' | 'details' = 'view';
  options: string[] = ['Proximos', 'Pasados'];
  filteredOptions: string[] = this.options;
  searchTerm: string = '';
  events: EventConsoleResponse[] = [];
  selectedFilter: string = 'Proximos'; // Opción seleccionada por defecto
  filteredEvents: EventConsoleResponse[] = [];
  displayedEvents: EventConsoleResponse[] = [];
  @Output() showDetailsEvent = new EventEmitter<number>();
  
  private eventService = inject(EventService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  filterOptions() {
    this.filteredOptions = this.options.filter(option =>
      option.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  ngOnInit() {
    this.loadEvents();
  }

  private loadEvents() {
    this.eventService.getEventList().subscribe(events => {
      this.events = events;
      this.displayedEvents = events;
    });
  }

  updateEvents(events: EventConsoleResponse[]) {
    this.displayedEvents = events;
  }

  handleButtonClick(eventId: number) {
    switch(this.buttonMode) {
      case 'edit':
        this.editEvent(eventId);
        break;
      case 'details':
        this.showDetails(eventId);
        break;
      default:
        this.viewMore(eventId);
        break;
    }
  }

  private editEvent(eventId: number) {
    this.router.navigate(['/event-edit', eventId]);
  }

  private showDetails(eventId: number) {
    this.showDetailsEvent.emit(eventId);
  }

  private viewMore(eventId: number) {
    this.router.navigate(['/event', eventId]);
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
}
