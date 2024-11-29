import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  template: `
    <div class="hero">
      <div class="hero-content">
        <h1>Bienvenido a TechConnect</h1>
        <p>Eventos tecnológicos y networking que te harán pensar, sin vaciar tu cartera</p>
        <div class="hero-buttons">
          <button class="primary-button">Registrarse</button>
          <button class="secondary-button">Explorar</button>
        </div>
      </div>
      <img src="assets/tecnologia-networking.png" alt="Tecnología y networking">
    </div>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, #98FB98, #2ecc71);
      min-height: calc(100vh - 64px);
      display: flex;
      align-items: center;
      padding: 2rem;
    }

    .hero-content {
      flex: 1;
      color: white;
    }

    h1 {
      font-size: 3.5rem;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.5rem;
      margin-bottom: 2rem;
    }

    .hero-buttons {
      display: flex;
      gap: 1rem;
    }

    button {
      padding: 1rem 2rem;
      border-radius: 25px;
      border: none;
      font-size: 1.1rem;
      cursor: pointer;
    }

    .primary-button {
      background: white;
      color: #2ecc71;
    }

    .secondary-button {
      background: transparent;
      border: 2px solid white;
      color: white;
    }

    img {
      max-width: 50%;
      height: auto;
    }
  `]
})
export class HomeComponent {
} 