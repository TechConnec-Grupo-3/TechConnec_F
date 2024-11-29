import { Component, inject, OnInit } from '@angular/core';


import { CartService } from '../../../../core/services/cart.service';

import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutService } from '../../../../core/services/checkout.service';
import { PurchaseService } from '../../../../core/services/purchase.service';
import { PurchaseCreateUpdateRequest, PurchaseItemCreateUpdateRequest } from '../../../../shared/models/purchase-create-update-request.model';
import { AuthService } from '../../../../core/services/auth.service';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: PurchaseItemCreateUpdateRequest[] = [
    {
      eventId: 1,
      eventName: "Concierto de Rock en Vivo",
      quantity: 2,
      price: 45.99
    },
    {
      eventId: 2,
      eventName: "Festival de Jazz",
      quantity: 1,
      price: 75.00
    }
  ];
  total: number = 0;
  loading = false;
  customerId!: number;

  private purchaseService = inject(PurchaseService);
  private checkoutService = inject(CheckoutService);
  private cartService = inject(CartService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.loadCart();

    this.customerId = this.authService.getUser()?.id || 0;


    const token = this.route.snapshot.queryParamMap.get('token');
    const payerId = this.route.snapshot.queryParamMap.get('PayerID');

    if (token && payerId) {
      this.loading = true;

      this.checkoutService.capturePaypalOrder(token)
        .subscribe(response => {
          if (response.completed) {
            this.clearCart();
            this.router.navigate(['/customer/cart', response.purchaseId]);
          }
        })
    }
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getCartTotal();
  }

  removeItem(bookId: number): void {
    this.cartService.removeFromCart(bookId);
    this.loadCart()
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.loadCart();
  }

  proceedToCheckout(): void {
    const cartItems = this.cartService.getCartItems();


    const purchaseRequest: PurchaseCreateUpdateRequest = {
      total: this.total,
      customerId: this.customerId,
      items: cartItems.map((item) => ({
        eventId: item.eventId,
        eventName: item.eventName,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    this.loading = true;

    this.purchaseService.createPurchase(purchaseRequest)
      .subscribe(purchase => {
        this.checkoutService.createPaypalOrder(purchase.id)
          .subscribe(response => {
            window.location.href = response.paypalUrl;
          })
      })
  }

  increaseQuantity(item: PurchaseItemCreateUpdateRequest): void {
    item.quantity++;
  }

  decreaseQuantity(item: PurchaseItemCreateUpdateRequest): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }
  removeItemd(eventId: number): void {
    this.cartItems = this.cartItems.filter(item => item.eventId !== eventId);
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  }
}
