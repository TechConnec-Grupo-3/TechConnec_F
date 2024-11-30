import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { PaymentService } from '../../../../core/services/payment.service';
import { EventService } from '../../../../core/services/event.service';
import { EventDetail } from '../../../../shared/models/event-detail-response.model';
import { environment } from '../../../../../environments/environment';


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
  eventDetails?: EventDetail;
  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private eventService: EventService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // Recuperar el eventId del localStorage


    // Obtener el ID del evento desde los parámetros de la ruta
    this.route.params.subscribe(params => {
      this.eventId = +params['id']; // Asegúrate de que el ID sea un número
      // Aquí puedes obtener el monto del evento desde un servicio o directamente
      // Por ejemplo, si tienes un servicio de eventos:
      
      //this.amount = 2.00; // Asigna el monto del evento aquí
    });
    if (this.eventId != null && this.eventId > 0) { // {{ edit_1 }}
      this.eventService.getEventDetails(this.eventId).subscribe({
          next: (details) => {
              this.eventDetails = details;
              this.amount = this.eventDetails.price; 

              console.log(this.eventDetails)
          },
          error: (error) => {
              console.error('Error al obtener detalles del evento:', error);
              this.eventDetails = undefined;
          }
      });
  }

    // Obtener el ID del usuario
    this.userId = this.authService.getCurrentUserId();
    // Asegurarse de que el monto no sea undefined
    console.log(this.amount);

    // Verificar si hay parámetros en la URL después de la redirección de PayPal
    this.route.queryParams.subscribe(params => {
        const payerId = params['PayerID'];
        const paymentId = params['paymentId'];
        
        if (payerId && paymentId) {
            this.savePaymentDetails(payerId, paymentId);
        }
    });
  }

  processPayment() {
    if (this.userId && this.amount > 0) {
      this.paymentService.createPayment(this.amount, this.eventId, this.userId).subscribe(
        response => {
          console.log('Pago procesado:', response);
          // Verifica si la respuesta contiene la URL de PayPal
          if (response && response.approvalUrl) {
            localStorage.setItem('eventId', this.eventId.toString());
            window.location.href = response.approvalUrl;
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

  // Método para guardar los detalles del pago en el backend
  savePaymentDetails(payerId: string, paymentId: string) {
    // Recuperar el eventId del localStorage
    const storedEventId = localStorage.getItem('eventId');
    const eventId = storedEventId ? parseInt(storedEventId, 10) : null; // Convertir a número o null si no existe

    // Construir el objeto de datos a enviar
    const paymentData = { 
        payerId, 
        paymentId, 
        userId: this.userId, // Enviar el ID del usuario
        eventId // Enviar el ID del evento recuperado del localStorage
    };

    // Realizar la solicitud POST con el objeto JSON en el cuerpo
    this.http.post(`${environment.apiUrl}/api/payment/success`, paymentData).subscribe({
        next: (response) => {
            console.log('Detalles del pago guardados:', response);
            alert('Pago realizado con éxito');
            localStorage.removeItem('eventId');
            this.router.navigate(['/profile']);
        },
        error: (error) => {
            alert('Pago realizado con éxito');
            localStorage.removeItem('eventId');
            this.router.navigate(['/profile']);
        }
    });
  }
}
