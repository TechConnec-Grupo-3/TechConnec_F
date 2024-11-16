import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CartItem {
  eventId: number;
  eventName: string;
  quantity: number;
  price: number;
  date: string;
  location: string;
}

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  cartItems: CartItem[] = [
    {
      eventId: 1,
      eventName: "Concierto de Rock en Vivo",
      quantity: 2,
      price: 45.99,
      date: "15 Dic 2024",
      location: "Teatro Principal"
    },
    {
      eventId: 2,
      eventName: "Festival de Jazz",
      quantity: 1,
      price: 75.00,
      date: "20 Dic 2024",
      location: "Auditorio Nacional"
    },
    {
      eventId: 3,
      eventName: "Opera Carmen",
      quantity: 3,
      price: 60.00,
      date: "25 Dic 2024",
      location: "Teatro Municipal"
    }
  ];

  loading = false;

  increaseQuantity(item: CartItem): void {
    item.quantity++;
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  removeItem(eventId: number): void {
    this.cartItems = this.cartItems.filter(item => item.eventId !== eventId);
  }

  clearCart(): void {
    this.cartItems = [];
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  }

  proceedToCheckout(): void {
    this.loading = true;
    console.log('Procesando checkout...');
    setTimeout(() => this.loading = false, 2000);
  }
}
