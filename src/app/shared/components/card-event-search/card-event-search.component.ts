import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { EventConsoleResponse } from '../../models/event-console-response';

@Component({
  selector: 'app-card-event-search',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatChipsModule],
  templateUrl: './card-event-search.component.html',
  styleUrl: './card-event-search.component.css'
})
export class CardEventSearchComponent {
  @Input() event!: EventConsoleResponse;
  @Output() deleteEvent = new EventEmitter<EventConsoleResponse>();

  onButtonClick(): void {
    console.log('Botón presionado en el componente hijo');
    // Emitir el evento con el evento actual
    this.deleteEvent.emit(this.event);
  }
}
