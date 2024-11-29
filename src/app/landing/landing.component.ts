import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface RegisterData {
  nombreCompleto: string;
  email: string;
  password: string;
  terminos: boolean;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  styles: [`
    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      border: none;
      background: none;
      font-size: 24px;
      cursor: pointer;
      padding: 5px;
    }

    .modal-header {
      position: relative;
      /* ... resto de los estilos del header ... */
    }
  `]
})
export class LandingComponent {
  showRegisterModal = false;
  registerData: RegisterData = {
    nombreCompleto: '',
    email: '',
    password: '',
    terminos: false
  };

  openRegisterModal() {
    this.showRegisterModal = true;
  }

  onRegister() {
    if (this.registerData.terminos) {
      console.log('Registro simulado:', this.registerData);
      alert('¡Registro exitoso!');
      this.showRegisterModal = false;
      // Resetear formulario
      this.registerData = {
        nombreCompleto: '',
        email: '',
        password: '',
        terminos: false
      };
    } else {
      alert('Debes aceptar los términos y condiciones para registrarte');
    }
  }
}