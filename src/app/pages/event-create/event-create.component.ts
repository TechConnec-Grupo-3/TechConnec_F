import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../../core/services/event.service';
import { ExponentService } from '../../core/services/exponent.service';
import { AuthService } from '../../core/services/auth.service';
import { EventType } from '../../shared/models/event-create.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Category } from '../../shared/models/category.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,
    MatDatepickerModule, MatNativeDateModule, NgFor
  ]
})
export class EventCreateComponent implements OnInit {
  eventForm!: FormGroup;
  exponentForm!: FormGroup;
  categories: Category[] = [];
  eventTypes = Object.values(EventType);
  showExponentForm = false;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private exponentService: ExponentService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.createForms();
  }

  ngOnInit() {
    this.loadCategories();
  }

  private createForms() {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      share: ['', Validators.required],
      registration: ['', Validators.required],
      categoryId: ['', Validators.required],
      typeEvent: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventTime: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]]
    });

    this.exponentForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  private loadCategories() {
    this.eventService.getCategories().subscribe(
      categories => this.categories = categories
    );
  }

  async onSubmit() {
    if (this.eventForm.valid && this.exponentForm.valid) {
      try {
        let exponente: any;
        this.exponentService.createExponent(this.exponentForm.value).subscribe({
          next: (response) => {
            exponente = response;
            
            const eventDate = this.eventForm.value.eventDate.toISOString().split('T')[0];
            const eventTime = this.eventForm.value.eventTime + ':00';

            const eventData = {
              ...this.eventForm.value,
              eventDate: eventDate,
              eventTime: eventTime,
              organizerId: this.authService.getCurrentUserId(),
              exponentId: exponente.exponent_id
            };
            console.log(eventData);

            this.eventService.createEvent(eventData).subscribe(
              response => {
                this.snackBar.open('Evento creado exitosamente', 'Cerrar', { duration: 3000 });

              },
              error => {
                this.snackBar.open('Error al crear el evento', 'Cerrar', { duration: 3000 });
              }
            );
          },
          error: (error) => {
            console.error('Error al crear el exponente:', error);
            this.snackBar.open('Error al crear el exponente', 'Cerrar', { duration: 3000 });
          }
        });
      } catch (error) {
        this.snackBar.open('Error al crear el exponente', 'Cerrar', { duration: 3000 });
      }
    }
  }
}
