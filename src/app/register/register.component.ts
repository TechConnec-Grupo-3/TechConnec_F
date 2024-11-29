import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-container">
      <h1>Crear una cuenta</h1>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Nombres</label>
          <input type="text" [(ngModel)]="userData.nombres" name="nombres" placeholder="Value">
        </div>

        <div class="form-group">
          <label>Apellidos</label>
          <input type="text" [(ngModel)]="userData.apellidos" name="apellidos" placeholder="Value">
        </div>

        <div class="form-group">
          <label>Número de teléfono</label>
          <input type="tel" [(ngModel)]="userData.telefono" name="telefono" placeholder="Value">
        </div>

        <div class="form-group">
          <label>Ubicación</label>
          <input type="text" [(ngModel)]="userData.ubicacion" name="ubicacion" placeholder="Value">
        </div>

        <div class="form-group">
          <label>Correo electrónico</label>
          <input type="email" [(ngModel)]="userData.correo" name="correo" placeholder="Value">
        </div>

        <div class="form-group">
          <label>Acerca de mí</label>
          <textarea [(ngModel)]="userData.acercaDeMi" name="acercaDeMi" placeholder="Value"></textarea>
        </div>

        <div class="form-group checkbox">
          <input type="checkbox" [(ngModel)]="userData.aceptaTerminos" name="aceptaTerminos" id="terminos">
          <label for="terminos">
            Aceptas las condiciones del servicio, la política privacidad y la política de cookies
          </label>
        </div>

        <button type="submit" class="register-btn">Registrarse</button>
      </form>
    </div>
  `,
  styles: [`
    .register-container {
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
    }

    h1 {
      text-align: center;
      margin-bottom: 30px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
    }

    input[type="text"],
    input[type="tel"],
    input[type="email"],
    textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }

    textarea {
      height: 100px;
      resize: vertical;
    }

    .checkbox {
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }

    .checkbox input {
      margin-top: 4px;
    }

    .register-btn {
      width: 100%;
      padding: 12px;
      background-color: #90EE90;
      border: none;
      border-radius: 4px;
      color: black;
      font-size: 16px;
      cursor: pointer;
    }

    .register-btn:hover {
      background-color: #7CCD7C;
    }
  `]
})
export class RegisterComponent {
  userData = {
    nombres: '',
    apellidos: '',
    telefono: '',
    ubicacion: '',
    correo: '',
    acercaDeMi: '',
    aceptaTerminos: false
  };

  onSubmit() {
    if (!this.userData.aceptaTerminos) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }

    // Simulación de registro
    console.log('Datos de registro:', this.userData);
    alert('Registro exitoso!');
    
    // Reiniciar el formulario
    this.userData = {
      nombres: '',
      apellidos: '',
      telefono: '',
      ubicacion: '',
      correo: '',
      acercaDeMi: '',
      aceptaTerminos: false
    };
  }
}