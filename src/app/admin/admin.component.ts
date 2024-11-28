import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Añade estas interfaces
interface EventRegistration {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface EventRegistrations {
  [key: string]: EventRegistration[];
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Navbar -->
    <nav class="navbar">
      <div class="logo">TechConnect</div>
      <div class="nav-right">
        <button class="create-event-btn" (click)="toggleCreateEventForm()" *ngIf="!showEventDetails">
          + Crear Evento
        </button>
        <div class="dropdown events-dropdown" *ngIf="!showEventDetails">
          <button class="events-btn">Eventos ▼</button>
          <div class="dropdown-content">
            <div class="event-item" *ngFor="let event of techEvents">
              <div class="event-header" (click)="showEventRegistrations(event.id)">
                <h4>{{event.name}}</h4>
                <p>Fecha: {{event.date}}</p>
                <p>Lugar: {{event.location}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown">
          <button class="admin-btn">Administrador ▼</button>
          <div class="dropdown-content">
            <a href="#" (click)="logout($event)">Cerrar Sesión</a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Formulario de Creación de Evento -->
    <div class="create-event-modal" *ngIf="showCreateEventForm">
      <div class="modal-content">
        <h2>Crear Nuevo Evento</h2>
        <form (submit)="createEvent()">
          <div class="form-group">
            <label>Nombre del Evento</label>
            <input type="text" [(ngModel)]="newEvent.name" name="name" required>
          </div>

          <div class="form-group">
            <label>Fecha</label>
            <input type="date" [(ngModel)]="newEvent.date" name="date" required>
          </div>

          <div class="form-group">
            <label>Hora</label>
            <input type="time" [(ngModel)]="newEvent.time" name="time" required>
          </div>

          <div class="form-group">
            <label>Ubicación</label>
            <input type="text" [(ngModel)]="newEvent.location" name="location" required>
          </div>

          <div class="form-actions">
            <button type="button" class="cancel-btn" (click)="toggleCreateEventForm()">Cancelar</button>
            <button type="submit" class="submit-btn">Crear Evento</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Vista de detalles del evento -->
    <div class="event-details-container" *ngIf="showEventDetails">
      <div class="event-details-header">
        <button class="back-btn" (click)="backToEvents()">← Volver</button>
        <h2>{{currentEvent?.name}}</h2>
        <p>Fecha: {{currentEvent?.date}}</p>
        <p>Lugar: {{currentEvent?.location}}</p>
      </div>

      <div class="search-container">
        <input type="text" 
               [(ngModel)]="eventSearchTerm" 
               placeholder="Buscar participante por nombre o ID..." 
               (keyup)="searchEventUsers()">
      </div>

      <table class="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Correo Electrónico</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of filteredEventUsers">
            <td>{{user.id}}</td>
            <td>{{user.name}}</td>
            <td>{{user.role}}</td>
            <td>{{user.email}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Resto del contenido del admin panel -->
    <div class="admin-container" *ngIf="!showEventDetails">
      <h1>Panel de Administrador</h1>
      
      <div class="search-container">
        <input type="text" [(ngModel)]="searchTerm" 
               placeholder="Buscar por nombre o ID..." 
               (keyup)="searchUsers()">
      </div>

      <table class="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo Electrónico</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of filteredUsers">
            <td>{{user.id}}</td>
            <td>{{user.name}}</td>
            <td>{{user.email}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .navbar {
      background-color: #00c853;
      padding: 15px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      color: white;
      font-size: 24px;
      font-weight: bold;
    }

    .admin-btn {
      background-color: white;
      color: #00c853;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }

    .dropdown {
      position: relative;
      display: inline-block;
    }

    .dropdown-content {
      display: none;
      position: absolute;
      right: 0;
      background-color: white;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 1;
      border-radius: 4px;
    }

    .dropdown:hover .dropdown-content {
      display: block;
    }

    .dropdown-content a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
    }

    .dropdown-content a:hover {
      background-color: #f1f1f1;
      border-radius: 4px;
    }

    .admin-container {
      padding: 20px;
    }
    .search-container {
      margin: 20px 0;
    }
    .search-container input {
      padding: 8px;
      width: 300px;
      border-radius: 4px;
      border: 1px solid #ddd;
    }
    .users-table {
      width: 100%;
      border-collapse: collapse;
    }
    .users-table th, .users-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    .users-table th {
      background-color: #f5f5f5;
    }

    .events-btn {
      background-color: white;
      color: #00c853;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      margin-right: 15px;
    }

    .events-dropdown .dropdown-content {
      min-width: 300px;
    }

    .event-item {
      padding: 15px;
      border-bottom: 1px solid #eee;
    }

    .event-item:last-child {
      border-bottom: none;
    }

    .event-item h4 {
      margin: 0 0 8px 0;
      color: #00c853;
    }

    .event-item p {
      margin: 5px 0;
      font-size: 14px;
    }

    .nav-right {
      display: flex;
      align-items: center;
    }

    .event-header {
      cursor: pointer;
      padding: 10px;
    }

    .event-header:hover {
      background-color: #f8f8f8;
    }

    .event-details-container {
      padding: 20px;
    }

    .event-details-header {
      margin-bottom: 30px;
    }

    .event-details-header h2 {
      color: #00c853;
      margin: 10px 0;
    }

    .back-btn {
      background-color: #00c853;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      margin-bottom: 15px;
    }

    .back-btn:hover {
      background-color: #009624;
    }

    .create-event-btn {
      background-color: white;
      color: #00c853;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      margin-right: 15px;
    }

    .create-event-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background-color: white;
      padding: 30px;
      border-radius: 8px;
      width: 90%;
      max-width: 500px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #333;
    }

    .form-group input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }

    .cancel-btn {
      background-color: #f5f5f5;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
    }

    .submit-btn {
      background-color: #00c853;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
    }

    .submit-btn:hover {
      background-color: #009624;
    }
  `]
})
export class AdminComponent {
  // Datos simulados de usuarios
  users = [
    { id: '001', name: 'Juan Pérez', email: 'juan@gmail.com' },
    { id: '002', name: 'María García', email: 'maria@gmail.com' },
    { id: '003', name: 'Carlos López', email: 'carlos@gmail.com' },
    { id: '004', name: 'Ana Martínez', email: 'ana@gmail.com' },
    { id: '005', name: 'Pedro Sánchez', email: 'pedro@gmail.com' },
  ];

  // Datos simulados de eventos
  techEvents = [
    {
      id: 'E001',
      name: 'TechConnect Conference 2024',
      date: '2024-05-15',
      location: 'Centro de Convenciones'
    },
    {
      id: 'E002',
      name: 'Hackathon Innovation',
      date: '2024-06-20',
      location: 'Campus Tecnológico'
    },
    {
      id: 'E003',
      name: 'Workshop IA & Machine Learning',
      date: '2024-07-10',
      location: 'Tech Hub Central'
    }
  ];

  // Datos simulados de inscripciones a eventos
  eventRegistrations: EventRegistrations = {
    'E001': [
      // Ponentes
      { id: 'U001', name: 'Laura Méndez', email: 'laura@gmail.com', role: 'Ponente' },
      { id: 'U002', name: 'Roberto Silva', email: 'roberto@gmail.com', role: 'Ponente' },
      // Usuarios
      { id: 'U003', name: 'Diana Torres', email: 'diana@gmail.com', role: 'Usuario' },
      { id: 'U004', name: 'Carlos Ruiz', email: 'carlos@gmail.com', role: 'Usuario' },
      { id: 'U005', name: 'Ana Martínez', email: 'ana@gmail.com', role: 'Usuario' },
      { id: 'U006', name: 'Pedro López', email: 'pedro@gmail.com', role: 'Usuario' },
      { id: 'U007', name: 'María García', email: 'maria@gmail.com', role: 'Usuario' },
      { id: 'U008', name: 'Juan Pérez', email: 'juan@gmail.com', role: 'Usuario' },
      { id: 'U009', name: 'Carmen Sánchez', email: 'carmen@gmail.com', role: 'Usuario' },
      { id: 'U010', name: 'Luis Rodríguez', email: 'luis@gmail.com', role: 'Usuario' },
      { id: 'U011', name: 'Isabel Díaz', email: 'isabel@gmail.com', role: 'Usuario' },
      { id: 'U012', name: 'Miguel Fernández', email: 'miguel@gmail.com', role: 'Usuario' },
      { id: 'U013', name: 'Sara Moreno', email: 'sara@gmail.com', role: 'Usuario' },
      { id: 'U014', name: 'Pablo Jiménez', email: 'pablo@gmail.com', role: 'Usuario' },
      { id: 'U015', name: 'Elena Castro', email: 'elena@gmail.com', role: 'Usuario' }
    ],
    'E002': [
      // Ponentes
      { id: 'U016', name: 'Javier Morales', email: 'javier@gmail.com', role: 'Ponente' },
      { id: 'U017', name: 'Sofía Vega', email: 'sofia@gmail.com', role: 'Ponente' },
      // Usuarios
      { id: 'U018', name: 'Ricardo Ortiz', email: 'ricardo@gmail.com', role: 'Usuario' },
      { id: 'U019', name: 'Marina López', email: 'marina@gmail.com', role: 'Usuario' },
      { id: 'U020', name: 'Alberto Sanz', email: 'alberto@gmail.com', role: 'Usuario' },
      { id: 'U021', name: 'Lucía Romero', email: 'lucia@gmail.com', role: 'Usuario' },
      { id: 'U022', name: 'Daniel Torres', email: 'daniel@gmail.com', role: 'Usuario' },
      { id: 'U023', name: 'Patricia Navarro', email: 'patricia@gmail.com', role: 'Usuario' },
      { id: 'U024', name: 'Fernando Gil', email: 'fernando@gmail.com', role: 'Usuario' },
      { id: 'U025', name: 'Beatriz Ruiz', email: 'beatriz@gmail.com', role: 'Usuario' },
      { id: 'U026', name: 'Andrés Molina', email: 'andres@gmail.com', role: 'Usuario' },
      { id: 'U027', name: 'Clara Serrano', email: 'clara@gmail.com', role: 'Usuario' },
      { id: 'U028', name: 'Hugo Martín', email: 'hugo@gmail.com', role: 'Usuario' },
      { id: 'U029', name: 'Nuria Sáez', email: 'nuria@gmail.com', role: 'Usuario' },
      { id: 'U030', name: 'Raúl Herrera', email: 'raul@gmail.com', role: 'Usuario' }
    ],
    'E003': [
      // Ponentes
      { id: 'U031', name: 'Eva Delgado', email: 'eva@gmail.com', role: 'Ponente' },
      { id: 'U032', name: 'Adrián Castro', email: 'adrian@gmail.com', role: 'Ponente' },
      // Usuarios
      { id: 'U033', name: 'Cristina Ramos', email: 'cristina@gmail.com', role: 'Usuario' },
      { id: 'U034', name: 'Jorge Medina', email: 'jorge@gmail.com', role: 'Usuario' },
      { id: 'U035', name: 'Alicia Flores', email: 'alicia@gmail.com', role: 'Usuario' },
      { id: 'U036', name: 'David Santos', email: 'david@gmail.com', role: 'Usuario' },
      { id: 'U037', name: 'Marta Reyes', email: 'marta@gmail.com', role: 'Usuario' },
      { id: 'U038', name: 'Víctor Cruz', email: 'victor@gmail.com', role: 'Usuario' },
      { id: 'U039', name: 'Laura Campos', email: 'laurac@gmail.com', role: 'Usuario' },
      { id: 'U040', name: 'Sergio Mora', email: 'sergio@gmail.com', role: 'Usuario' },
      { id: 'U041', name: 'Paula Guerrero', email: 'paula@gmail.com', role: 'Usuario' },
      { id: 'U042', name: 'Diego Vargas', email: 'diego@gmail.com', role: 'Usuario' },
      { id: 'U043', name: 'Alba Cano', email: 'alba@gmail.com', role: 'Usuario' },
      { id: 'U044', name: 'Rubén Prieto', email: 'ruben@gmail.com', role: 'Usuario' },
      { id: 'U045', name: 'Carmen Durán', email: 'carmend@gmail.com', role: 'Usuario' }
    ]
  };

  showEventDetails: boolean = false;
  currentEventId: string = '';
  currentEvent: any = null;
  filteredEventUsers: EventRegistration[] = [];
  eventSearchTerm: string = '';
  
  filteredUsers = [...this.users];
  searchTerm: string = '';

  showCreateEventForm: boolean = false;
  newEvent = {
    id: '',
    name: '',
    date: '',
    time: '',
    location: ''
  };

  searchUsers() {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(term) || 
      user.id.toLowerCase().includes(term)
    );
  }

  showEventRegistrations(eventId: string) {
    this.currentEventId = eventId;
    this.currentEvent = this.techEvents.find(event => event.id === eventId);
    this.filteredEventUsers = this.eventRegistrations[eventId];
    this.showEventDetails = true;
  }

  searchEventUsers() {
    const term = this.eventSearchTerm.toLowerCase();
    this.filteredEventUsers = this.eventRegistrations[this.currentEventId].filter(user => 
      user.name.toLowerCase().includes(term) || 
      user.id.toLowerCase().includes(term)
    );
  }

  backToEvents() {
    this.showEventDetails = false;
    this.currentEventId = '';
    this.eventSearchTerm = '';
  }

  toggleCreateEventForm() {
    this.showCreateEventForm = !this.showCreateEventForm;
  }

  createEvent() {
    // Simular creación de ID único
    const newId = `E${(this.techEvents.length + 1).toString().padStart(3, '0')}`;
    
    const event = {
      ...this.newEvent,
      id: newId
    };

    this.techEvents.push(event);
    this.showCreateEventForm = false;
    
    // Resetear el formulario
    this.newEvent = {
      id: '',
      name: '',
      date: '',
      time: '',
      location: ''
    };
  }

  @Output() logoutEvent = new EventEmitter<void>();

  logout(event: Event) {
    event.preventDefault();
    this.logoutEvent.emit();
  }
} 