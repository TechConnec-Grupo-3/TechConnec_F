import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { PaymentService } from '../../../../core/services/payment.service';


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  amount: number = 0; // Monto del pago
  eventId: number = 0; // ID del evento
  userId: number | null = null; // ID del usuario

  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Obtener el ID del evento desde los parámetros de la ruta
    this.route.params.subscribe(params => {
      this.eventId = +params['id']; // Asegúrate de que el ID sea un número
      // Aquí puedes obtener el monto del evento desde un servicio o directamente
      // Por ejemplo, si tienes un servicio de eventos:
      // this.amount = this.eventService.getEventById(this.eventId).amount;
      this.amount = 2.00; // Asigna el monto del evento aquí
    });

    // Obtener el ID del usuario
    this.userId = this.authService.getCurrentUserId();
  }

  processPayment() {
    if (this.userId) {
      this.paymentService.createPayment(this.amount, this.eventId, this.userId).subscribe(
        response => {
          console.log('Pago procesado:', response);
          // Verifica si la respuesta contiene la URL de PayPal
          if (response && response.paypalUrl) {
            // Redirige al usuario a la URL de PayPal
            //window.location.href = response.paypalUrl;
            console.log(response);
          } else {
            console.error('No se recibió la URL de PayPal en la respuesta.');
            // Manejar el caso donde no se recibe la URL
          }
        },
        error => {
          console.error('Error al procesar el pago:', error);
          // Manejar el error (mostrar un mensaje al usuario, etc.)
        }
      );
    } else {
      console.error('No se pudo obtener el ID del usuario.');
      // Manejar el caso donde no hay usuario autenticado
    }
  }
}
