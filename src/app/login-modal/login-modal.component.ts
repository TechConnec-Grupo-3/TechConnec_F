import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-overlay" (click)="closeModal($event)">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>Iniciar Sesión</h2>
          <button class="close-btn" (click)="close()">&times;</button>
        </div>

        <form (ngSubmit)="onLogin()" class="login-form">
          <div class="form-group">
            <input 
              type="email" 
              [(ngModel)]="email" 
              name="email"
              placeholder="Correo electrónico" 
              required>
          </div>

          <div class="form-group">
            <input 
              type="password" 
              [(ngModel)]="password" 
              name="password"
              placeholder="Contraseña" 
              required>
          </div>

          <button type="submit" class="login-btn">Iniciar Sesión</button>
          
          <a href="#" class="forgot-link" (click)="forgotPassword($event)">
            ¿Olvidaste tu contraseña?
          </a>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #666;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    input {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .login-btn {
      width: 100%;
      padding: 0.8rem;
      background: #2ecc71;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      margin-bottom: 1rem;
    }

    .login-btn:hover {
      background: #27ae60;
    }

    .forgot-link {
      display: block;
      text-align: center;
      color: #666;
      text-decoration: none;
      font-size: 0.9rem;
    }

    .forgot-link:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginModalComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLogin() {
    if (this.email && this.password) {
      setTimeout(() => {
        alert(`Iniciando sesión con:\nEmail: ${this.email}`);
        this.router.navigate(['/home']);
        this.close();
      }, 1000);
    } else {
      alert('Por favor, complete todos los campos');
    }
  }

  forgotPassword(event: Event) {
    event.preventDefault();
    if (this.email) {
      alert(`Se enviará un correo de recuperación a: ${this.email}`);
    } else {
      alert('Por favor, ingrese su correo electrónico');
    }
  }

  close() {
    // Implementar lógica de cierre
  }

  closeModal(event: Event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}