import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import { PasswordResetService } from "../../../core/services/password-reset.service";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";

@Component({
    selector: 'app-reset-password',
    template: `
    <div class="reset-password-container">
      <div class="form-card">
        <h2>Restablecer contraseña</h2>
        
        <div *ngIf="!isValidToken" class="error-card">
          <i class="fas fa-exclamation-circle"></i>
          <p>El enlace ha expirado o no es válido.</p>
          <a routerLink="/forgot-password">Solicitar nuevo enlace</a>
        </div>

        <form *ngIf="isValidToken" (ngSubmit)="onSubmit()" #resetForm="ngForm">
          <div class="form-group">
            <label>Nueva contraseña</label>
            <input 
              [(ngModel)]="newPassword" 
              name="password" 
              type="password"
              placeholder="Ingresa tu nueva contraseña"
              required
              minlength="8"
              #passwordInput="ngModel">
            
            <div class="password-requirements">
              <p>La contraseña debe contener:</p>
              <ul>
                <li>Mínimo 8 caracteres</li>
                <li>Al menos una letra mayúscula</li>
                <li>Al menos un número</li>
              </ul>
            </div>
          </div>

          <div class="form-group">
            <label>Confirmar contraseña</label>
            <input 
              [(ngModel)]="confirmPassword" 
              name="confirmPassword" 
              type="password"
              placeholder="Confirma tu nueva contraseña"
              required
              #confirmInput="ngModel">
          </div>

          <button type="submit" [disabled]="resetForm.invalid || newPassword !== confirmPassword">
            Cambiar contraseña
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .reset-password-container {
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
      margin-bottom: 2rem;
      text-align: center;
    }

    .error-card {
      text-align: center;
      padding: 2rem;
      color: #dc3545;
    }

    .error-card i {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .error-card a {
      color: #007bff;
      text-decoration: none;
      display: block;
      margin-top: 1rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
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

    .password-requirements {
      margin-top: 1rem;
      padding: 1rem;
      background-color: #f8f9fa;
      border-radius: 5px;
    }

    .password-requirements p {
      color: #666;
      margin-bottom: 0.5rem;
    }

    .password-requirements ul {
      padding-left: 1.5rem;
      color: #666;
      font-size: 0.875rem;
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

    @media (max-width: 480px) {
      .form-card {
        padding: 1.5rem;
      }
    }
  `],
    standalone: true,
    imports: [FormsModule, RouterOutlet, NgIf]
  })
  export class ResetPasswordComponent implements OnInit {
    token: string = '';
    isValidToken: boolean = false;
    newPassword: string = '';
    confirmPassword: string = '';
    constructor(
      private route: ActivatedRoute,
      private passwordResetService: PasswordResetService,
      private router: Router
    ) {}
  
    ngOnInit() {
      this.route.params.subscribe(params => {
        this.token = params['token'];
        this.verifyToken();
      });
    }
  
    verifyToken() {
      this.passwordResetService.verifyToken(this.token)
        .subscribe({
          next: (isValid) => {
            this.isValidToken = isValid;
          },
          error: (error) => {
            console.error('Token inválido:', error);
          }
        });
    }
  
    onSubmit() {
      this.passwordResetService.resetPassword(this.token, this.newPassword)
        .subscribe({
          next: () => {
            alert('Contraseña actualizada exitosamente');
            this.router.navigate(['/login']);
            // Redirigir al login
          },
          error: (error) => {
            console.error('Error:', error);
          }
        });
    }
  }