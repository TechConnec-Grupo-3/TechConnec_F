import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { ModalService } from '../services/modal.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClickOutsideDirective } from '../directives/click-outside.directive';
import { AuthService } from '../services/auth.service';

// Agregar esta interfaz antes del @Component
interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;  // Opcional, por si lo necesitas después
}


@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar">
      <div class="logo">TechConnect</div>
      <div class="search-bar">
        <input type="text" placeholder="Buscar eventos de networking">
      </div>
      <div class="region-selector">
        <select>
          <option>Todas las regiones</option>
        </select>
      </div>
      <div class="auth-buttons">
        <button (click)="onLogin()" class="login-btn">Iniciar Sesión</button>
        <button (click)="onRegister()" class="register-btn">Registrarse</button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      align-items: center;
      padding: 1rem 2rem;
      background-color: #2ecc71;
      color: white;
      gap: 1rem;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
    }

    .search-bar input {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 20px;
      width: 300px;
    }

    .region-selector select {
      padding: 0.5rem;
      border: none;
      border-radius: 20px;
      background: white;
    }

    .auth-buttons {
      margin-left: auto;
      display: flex;
      gap: 1rem;
    }

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 20px;
      cursor: pointer;
    }

    .login-btn {
      background-color: transparent;
      border: 1px solid white;
      color: white;
    }

    .register-btn {
      background-color: white;
      color: #2ecc71;
    }

    button:hover {
      opacity: 0.9;
    }
  `],
  standalone: true,
  imports: [CommonModule, FormsModule, RegisterComponent, ClickOutsideDirective]
})
export class NavbarComponent implements OnInit {
  searchQuery: string = '';
  selectedRegion: string = '';
  showEventSuggestions: boolean = false;

  // Datos simulados
  mockEvents: string[] = [
    'Hackathon Lima 2024',
    'AWS Community Day Perú',
    'DevOps Meetup Lima',
    'Python Conference Perú',
    'Startup Weekend Lima',
    'Tech Networking Night',
    'JavaScript Developer Conference',
    'Women in Tech Perú',
    'Data Science Workshop',
    'Blockchain & Crypto Meetup'
  ];

  regions: string[] = [
    'Lima', 'Arequipa', 'Trujillo', 'Cusco', 'Piura', 
    'Chiclayo', 'Ica', 'Huancayo', 'Tacna', 'Cajamarca'
  ];

  filteredEvents: string[] = [];

  constructor(
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize component here if needed
  }

  onEventSearch(event: any) {
    const value = event.target.value.toLowerCase();
    if (value) {
      this.filteredEvents = this.mockEvents.filter(event => 
        event.toLowerCase().includes(value)
      );
      this.showEventSuggestions = true;
    } else {
      this.filteredEvents = [];
      this.showEventSuggestions = false;
    }
  }

  selectEvent(event: string) {
    this.searchQuery = event;
    this.showEventSuggestions = false;
  }

  onLogin() {
    alert('Iniciando sesión...');
    this.router.navigate(['/login']);
  }

  onRegister() {
    alert('Registrando...');
    this.router.navigate(['/register']);
  }
}
