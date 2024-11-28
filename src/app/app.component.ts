import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="!isAdminView">
      <nav class="navbar">
        <div class="logo">TechConnect</div>
        <div class="search">
          <input type="text" placeholder="Buscar eventos de networking">
        </div>
        <select class="region-select">
          <option>Todas las regiones</option>
        </select>
        <div class="auth-buttons">
          <button (click)="showLoginModal = true" class="login-btn">Iniciar Sesión</button>
          <button (click)="showRegisterModal = true" class="register-btn">Registrarse</button>
        </div>
      </nav>

      <div class="hero">
        <div class="hero-content">
          <h1>Bienvenido a TechConnect</h1>
          <p>Eventos tecnológicos y networking que te harán pensar, sin vaciar tu cartera</p>
          <div class="hero-buttons">
            <button (click)="showRegisterModal = true" class="register-btn">Registrarse</button>
            <button class="explore-btn">Explorar</button>
          </div>
        </div>
      </div>

      <!-- Modal de Login -->
      <div *ngIf="showLoginModal" class="modal-overlay">
        <div class="modal-content">
          <h2>Iniciar Sesión</h2>
          <button class="close-btn" (click)="showLoginModal = false">&times;</button>
          <form (submit)="onLogin($event)">
            <input type="email" [(ngModel)]="loginEmail" name="email" placeholder="Correo electrónico" required>
            <input type="password" [(ngModel)]="loginPassword" name="password" placeholder="Contraseña" required>
            <button type="submit">Iniciar Sesión</button>
            <a href="#" (click)="forgotPassword($event)">¿Olvidaste tu contraseña?</a>
          </form>
        </div>
      </div>

      <!-- Modal de Registro -->
      <div *ngIf="showRegisterModal" class="modal-overlay">
        <div class="modal-content">
          <h2>Registrarse</h2>
          <button class="close-btn" (click)="showRegisterModal = false">&times;</button>
          <form (submit)="onRegister($event)">
            <input type="text" [(ngModel)]="registerName" name="name" placeholder="Nombre completo" required>
            <input type="email" [(ngModel)]="registerEmail" name="email" placeholder="Correo electrónico" required>
            <input type="password" [(ngModel)]="registerPassword" name="password" placeholder="Contraseña" required>
            <button type="submit">Registrarse</button>
          </form>
        </div>
      </div>

      <!-- Modal de Verificación -->
      <div *ngIf="showVerificationModal" class="modal-overlay">
        <div class="modal-content">
          <h2>Verificación</h2>
          <button class="close-btn" (click)="showVerificationModal = false">&times;</button>
          <form (submit)="verifyCode($event)">
            <p>Ingrese el código de 6 dígitos enviado a su correo</p>
            <input type="text" [(ngModel)]="verificationCode" name="code" 
                   placeholder="Código de verificación" maxlength="6" required>
            <button type="submit">Verificar</button>
          </form>
        </div>
      </div>

      <!-- Modal de Reset Password -->
      <div *ngIf="showResetPasswordModal" class="modal-overlay">
        <div class="modal-content">
          <h2>Nueva Contraseña</h2>
          <button class="close-btn" (click)="showResetPasswordModal = false">&times;</button>
          <form (submit)="resetPassword($event)">
            <input type="password" [(ngModel)]="newPassword" name="newPassword" 
                   placeholder="Nueva contraseña" required>
            <input type="password" [(ngModel)]="confirmPassword" name="confirmPassword" 
                   placeholder="Confirmar contraseña" required>
            <button type="submit">Cambiar Contraseña</button>
          </form>
        </div>
      </div>
    </div>

    <app-admin 
      *ngIf="isAdminView"
      (logoutEvent)="handleLogout()">
    </app-admin>
  `,
  styles: [`
    .navbar {
      display: flex;
      align-items: center;
      padding: 1rem 2rem;
      background-color: #2ecc71;
      color: white;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
    }

    .search input {
      margin: 0 2rem;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 20px;
      width: 300px;
    }

    .region-select {
      padding: 0.5rem;
      border: none;
      border-radius: 20px;
      margin-right: 2rem;
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
      background: transparent;
      border: 1px solid white;
      color: white;
    }

    .register-btn {
      background: white;
      color: #2ecc71;
    }

    .hero {
      height: 80vh;
      background: linear-gradient(135deg, #2ecc71, #27ae60);
      display: flex;
      align-items: center;
      padding: 0 4rem;
      color: white;
    }

    .hero-content h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .hero-content p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }

    .hero-buttons {
      display: flex;
      gap: 1rem;
    }

    .explore-btn {
      background: transparent;
      border: 1px solid white;
      color: white;
    }

    .modal-overlay {
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
      padding: 2rem;
      border-radius: 8px;
      width: 90%;
      max-width: 400px;
      position: relative;
    }

    .close-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    input {
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    form button {
      background: #2ecc71;
      color: white;
      padding: 0.8rem;
      border-radius: 4px;
    }

    a {
      text-align: center;
      color: #666;
      text-decoration: none;
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AdminComponent
  ]
})
export class AppComponent {
  showLoginModal = false;
  showRegisterModal = false;
  showVerificationModal = false;
  showResetPasswordModal = false;
  isAdminView = false;
  
  loginEmail: string = '';
  loginPassword: string = '';
  registerName: string = '';
  registerEmail: string = '';
  registerPassword: string = '';
  verificationCode: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  expectedCode: string = '';

  onLogin(event: Event) {
    event.preventDefault();
    if (this.loginEmail === 'admin@gmail.com' && this.loginPassword === '123456') {
      this.showLoginModal = false;
      this.isAdminView = true;
      this.loginEmail = '';
      this.loginPassword = '';
    } else {
      alert('Credenciales incorrectas');
    }
  }

  onRegister(event: Event) {
    event.preventDefault();
    if (this.registerName && this.registerEmail && this.registerPassword) {
      alert(`Registro simulado con éxito!\nNombre: ${this.registerName}\nEmail: ${this.registerEmail}`);
      this.showRegisterModal = false;
      this.registerName = '';
      this.registerEmail = '';
      this.registerPassword = '';
    } else {
      alert('Por favor, complete todos los campos');
    }
  }

  forgotPassword(event: Event) {
    event.preventDefault();
    if (this.loginEmail) {
      // Código fijo de verificación
      this.expectedCode = '123456';
      alert(`Código de verificación enviado a: ${this.loginEmail}`);
      this.showLoginModal = false;
      this.showVerificationModal = true;
    } else {
      alert('Por favor, ingrese su correo electrónico');
    }
  }

  verifyCode(event: Event) {
    event.preventDefault();
    if (this.verificationCode === this.expectedCode) {
      this.showVerificationModal = false;
      this.showResetPasswordModal = true;
      this.verificationCode = '';
    } else {
      alert('Código incorrecto');
    }
  }

  resetPassword(event: Event) {
    event.preventDefault();
    if (!this.newPassword || !this.confirmPassword) {
      alert('Por favor, complete todos los campos');
      return;
    }
    
    if (this.newPassword !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    alert('Contraseña actualizada con éxito');
    this.showResetPasswordModal = false;
    this.newPassword = '';
    this.confirmPassword = '';
    this.expectedCode = '';
  }

  handleLogout() {
    this.isAdminView = false;
  }
}
