import { Component } from "@angular/core";
import { PasswordResetService } from "../../../core/services/password-reset.service";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";

@Component({
    selector: 'app-forgot-password',
    template: `
    <div class="forgot-password-container">
      <div class="form-card">
        <h2>¿Olvidaste tu contraseña?</h2>
        <p>Ingresa tu correo electrónico para recibir instrucciones</p>
        
        <form (ngSubmit)="onSubmit()" #forgotForm="ngForm">
          <div class="form-group">
            <input 
              [(ngModel)]="email" 
              name="email" 
              type="email" 
              placeholder="Correo electrónico"
              required
              email
              #emailInput="ngModel">
            <div class="error-message" *ngIf="emailInput.invalid && emailInput.touched">
              Por favor, ingresa un correo válido
            </div>
          </div>
          
          <button type="submit" [disabled]="forgotForm.invalid">
            Enviar instrucciones
          </button>
        </form>
        
        <div class="back-to-login">
          <a routerLink="/login">Volver al inicio de sesión</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .forgot-password-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f5f5;
      padding: 20px;
    }

    .form-card {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }

    h2 {
      color: #333;
      margin-bottom: 1rem;
      text-align: center;
    }

    p {
      color: #666;
      margin-bottom: 2rem;
      text-align: center;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    input {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 16px;
      transition: border-color 0.3s ease;
    }

    input:focus {
      outline: none;
      border-color: #007bff;
    }

    .error-message {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    button {
      width: 100%;
      padding: 12px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #0056b3;
    }

    button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }

    .back-to-login {
      text-align: center;
      margin-top: 1.5rem;
    }

    .back-to-login a {
      color: #007bff;
      text-decoration: none;
    }

    .back-to-login a:hover {
      text-decoration: underline;
    }

    @media (max-width: 480px) {
      .form-card {
        padding: 1.5rem;
      }
    }
  `],
    standalone: true,
    imports: [FormsModule, NgIf]
  })
  export class ForgotPasswordComponent {
    email: string = '';
  
    constructor(private passwordResetService: PasswordResetService) {}
  
    onSubmit() {
      this.passwordResetService.requestPasswordReset(this.email)
        .subscribe({
          next: () => {
            alert('Revisa tu correo para las instrucciones');
          },
          error: (error) => {
            console.error('Error:', error);
          }
        });
    }
  }