import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  isAdmin: boolean;
  description: string;
}

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Lista de Eventos</h2>

      <!-- Lista de eventos -->
      <div class="events-container">
        <div *ngFor="let event of events" class="event-card">
          <div class="event-content">
            <div class="event-header">
              <h3>{{ event.title }}</h3>
              <!-- Botones de administrador -->
              <div class="admin-buttons">
                <button class="edit-btn" (click)="editEvent(event)">
                  ✏️ Editar
                </button>
                <button class="delete-btn" (click)="deleteEvent(event.id)">
                  🗑️ Eliminar
                </button>
              </div>
            </div>
            <p><strong>Fecha:</strong> {{ event.date }}</p>
            <p><strong>Ubicación:</strong> {{ event.location }}</p>
            <p><strong>Descripción:</strong> {{ event.description }}</p>
          </div>
        </div>
      </div>

      <!-- Modal de edición -->
      <div *ngIf="editingEvent" class="modal">
        <div class="modal-content">
          <h3>Editar Evento</h3>
          <input [(ngModel)]="editingEvent.title" placeholder="Título">
          <input type="date" [(ngModel)]="editingEvent.date">
          <input [(ngModel)]="editingEvent.location" placeholder="Ubicación">
          <textarea [(ngModel)]="editingEvent.description" placeholder="Descripción"></textarea>
          <div class="modal-buttons">
            <button class="save-btn" (click)="saveEvent()">Guardar</button>
            <button class="cancel-btn" (click)="cancelEdit()">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .events-container {
      display: grid;
      gap: 20px;
      margin-top: 20px;
    }

    .event-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .event-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }

    .admin-buttons {
      display: flex;
      gap: 10px;
    }

    .edit-btn, .delete-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }

    .edit-btn {
      background-color: #4CAF50;
      color: white;
    }

    .delete-btn {
      background-color: #f44336;
      color: white;
    }

    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 8px;
      width: 400px;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    input, textarea {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 100%;
    }

    textarea {
      min-height: 100px;
      resize: vertical;
    }

    .modal-buttons {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }

    .save-btn, .cancel-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .save-btn {
      background-color: #4CAF50;
      color: white;
    }

    .cancel-btn {
      background-color: #757575;
      color: white;
    }
  `]
})
export class EventComponent {
  events: Event[] = [
    {
      id: 1,
      title: 'TechConnect Conference 2024',
      date: '2024-05-15',
      location: 'Centro de Convenciones',
      description: 'Conferencia anual de tecnología',
      isAdmin: true
    },
    {
      id: 2,
      title: 'Hackathon 2024',
      date: '2024-06-20',
      location: 'Campus Principal',
      description: 'Competencia de programación',
      isAdmin: true
    },
    {
      id: 3,
      title: 'Workshop de IA',
      date: '2024-07-10',
      location: 'Tech Hub',
      description: 'Taller práctico de IA',
      isAdmin: true
    }
  ];

  editingEvent: Event | null = null;

  editEvent(event: Event) {
    this.editingEvent = { ...event };
  }

  saveEvent() {
    if (this.editingEvent) {
      const index = this.events.findIndex(e => e.id === this.editingEvent!.id);
      if (index !== -1) {
        this.events[index] = { ...this.editingEvent };
        alert('Evento actualizado exitosamente');
      }
      this.editingEvent = null;
    }
  }

  cancelEdit() {
    this.editingEvent = null;
  }

  deleteEvent(eventId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      this.events = this.events.filter(event => event.id !== eventId);
      alert('Evento eliminado exitosamente');
    }
  }
}
