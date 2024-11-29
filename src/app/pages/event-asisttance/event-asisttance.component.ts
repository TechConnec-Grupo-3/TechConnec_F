import { Component, inject, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { EventAssistanceResponse } from '../../shared/models/event-assistance-response';
import { EventService } from '../../core/services/event.service';



@Component({
  selector: 'app-event-asisttance',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './event-asisttance.component.html',
  styleUrl: './event-asisttance.component.css'
})



export class EventAsisttanceComponent implements OnInit{
  displayedColumns: string[] = ['position', 'name', 'correo', 'status'];
  
  assistance: EventAssistanceResponse[] = [];
  dataSource: EventAssistanceResponse[] = [];

  private eventService = inject(EventService);

  ngOnInit(): void {
    this.eventService.getEventAssistance().subscribe({
      next: (assistance) => {
        this.dataSource = assistance;
      },
      error: (error) =>
        console.error('Error al cargar la lista de asistentes', error),
    });
  }
}
