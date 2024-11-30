import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardMdImage, MatCardModule } from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../core/services/event.service';

@Component({
  selector: 'app-event-edit',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatDatepickerModule, NgFor,
    MatButtonModule, FormsModule, ReactiveFormsModule
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './event-edit.component.html',
  styleUrl: './event-edit.component.css'
  
})
export class EventEditComponent implements OnInit {
  eventForm: FormGroup;
  eventId: number = 0;

  // Lista de opciones para las horas (formato 24 horas)
  optionshour: string[] = [
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
    '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'
  ];

  // Lista de opciones para los minutos
  optionsminutes: string[] = ['00', '10', '20', '30', '40', '50'];
  options: string[] = ['am', 'pm'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      hh: ['', Validators.required],
      mm: ['', Validators.required],
      ubicacion: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.eventId = +params['id'];
        this.loadEventDetails(this.eventId);
      }
    });
  }

  loadEventDetails(id: number): void {
    this.eventService.getEventDetails(id).subscribe({
      next: (event) => {
        this.eventForm.patchValue({
          titulo: event.title,
          descripcion: event.description,
          ubicacion: event.location
        });
      },
      error: (error) => {
        console.error('Error al cargar los detalles del evento:', error);
      }
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      // Obtener los valores del formulario
      const formValues = this.eventForm.value;
      
      // Formatear la fecha
      const fecha = new Date(formValues.fecha);
      const fechaFormateada = fecha.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      
      // Formatear la hora
      const horaFormateada = `${formValues.hh}:${formValues.mm}:00`; // Formato HH:mm:ss
      
      // Crear el objeto con el formato requerido por el backend
      const eventData = {
        id: this.eventId,
        title: formValues.titulo,
        description: formValues.descripcion,
        location: formValues.ubicacion,
        eventDate: fechaFormateada,
        eventTime: horaFormateada
      };
      
      console.log('Datos formateados para enviar:', eventData);
      
      this.eventService.updateEvent(eventData).subscribe({
        next: (response) => {
          console.log('Respuesta exitosa del servidor:', response);
          this.router.navigate(['/profile']);
        },
        error: (error) => {
          console.error('Error al actualizar el evento:', error);
        }
      });
    }
  }
}
