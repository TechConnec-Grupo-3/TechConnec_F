import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <div class="logo">
        <img src="assets/techconnec-logo.png" alt="TechConnec">
        <h1>TechConnec</h1>
      </div>

      <form (ngSubmit)="onLogin()" class="login-form">
        <div class="form-group">
          <label>Correo electrónico</label>
          <input type="email" placeholder="Ingrese su correo">
        </div>

        <div class="form-group">
          <label>Contraseña</label>
          <input type="password" placeholder="Ingrese su contraseña">
        </div>

        <button type="submit" class="login-btn">Iniciar Sesión</button>
        
        <a href="#" class="forgot-password" (click)="onForgotPassword($event)">
          ¿Olvidaste tu contraseña?
        </a>
      </form>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 400px;
      margin: 50px auto;
      padding: 2rem;
    }

    .logo {
      text-align: center;
      margin-bottom: 2rem;
    }

    .logo img {
      width: 80px;
      height: auto;
    }

    .logo h1 {
      margin-top: 1rem;
      color: #333;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-group label {
      color: #666;
      font-size: 0.9rem;
    }

    .form-group input {
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .login-btn {
      background-color: #2ecc71;
      color: white;
      padding: 1rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .login-btn:hover {
      background-color: #27ae60;
    }

    .forgot-password {
      text-align: center;
      color: #666;
      text-decoration: none;
      font-size: 0.9rem;
    }

    .forgot-password:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent {
  constructor(private router: Router) {}

  onLogin() {
    alert('Iniciando sesión...');
    this.router.navigate(['/home']);
  }

  onForgotPassword(event: Event) {
    event.preventDefault();
    alert('Se enviará un correo para restablecer tu contraseña');
  }
}