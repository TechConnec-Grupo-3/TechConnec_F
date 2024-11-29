import { Component, inject, Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { EventService } from '../../core/services/event.service';
import { EventDetail } from '../../shared/models/event-detail-response.model';
import { EventCommentComponent } from "../event-comment/event-comment.component";
import { MediaService } from '../../core/services/media.service';
import { MatDialog } from '@angular/material/dialog';
import { CardShareEventComponent } from '../../shared/components/card-share-event/card-share-event.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [MatLabel, MatInputModule, MatIconModule, MatButtonModule, MatProgressBar,
    MatCardModule, NgIf, MatDivider, ReactiveFormsModule, EventCommentComponent,
  RouterLink],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnChanges {
  @Input() eventId?: number;
  @Output() backToList = new EventEmitter<void>();

  private eventService = inject(EventService);
  private snackBar = inject(MatSnackBar);
  private mediaService = inject(MediaService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  eventIdControl = new FormControl('');
  eventDetails?: EventDetail;
  isLoading = false;
  eventImageUrl: string = 'https://via.placeholder.com/800x400?text=Imagen+del+Evento';
  exponentImageUrl: string = 'https://via.placeholder.com/150x150?text=Foto+Exponente';

  searchEvent(): void {
    const eventId = Number(this.eventIdControl.value);
    
    if (!eventId) {
      this.showMessage('Por favor ingrese un ID válido');
      return;
    }

    this.isLoading = true;
    this.eventService.getEventDetails(eventId).subscribe({
      next: (details) => {
        this.eventDetails = details;
        this.loadEventImages();
        this.isLoading = false;
        console.log(this.eventDetails);
      },
      error: (error) => {
        console.error('Error al obtener detalles del evento:', error);
        this.isLoading = false;
        this.eventDetails = undefined;
        this.showMessage('Error al obtener los detalles del evento');
      }
    });
  }

   
  ngOnChanges(changes: SimpleChanges) {
    if (changes['eventId'] && this.eventId) {
      this.loadEventDetails(this.eventId);
    }
  }
  private loadEventDetails(id: number) {
    this.isLoading = true;
    this.eventService.getEventDetails(id).subscribe({
      next: (details) => {
        this.eventDetails = details;
        this.loadEventImages();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener detalles del evento:', error);
        this.isLoading = false;
        this.eventDetails = undefined;
        this.showMessage('Error al obtener los detalles del evento');
      }
    });
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000
    });
  }

  loadEventImages() {
    if (this.eventDetails) {
      if (this.eventDetails.eventImage) {
        this.mediaService.getMedia(this.eventDetails.eventImage).subscribe({
          next: (blob) => {
            this.eventImageUrl = URL.createObjectURL(blob);
          },
          error: () => {
            this.eventImageUrl = 'https://via.placeholder.com/800x400?text=Imagen+del+Evento';
          }
        });
      }

      if (this.eventDetails.exponentImage) {
        this.mediaService.getMedia(this.eventDetails.exponentImage).subscribe({
          next: (blob) => {
            this.exponentImageUrl = URL.createObjectURL(blob);
          },
          error: () => {
            this.exponentImageUrl = 'https://via.placeholder.com/150x150?text=Foto+Exponente';
          }
        });
      }
    }
  }

  ngOnDestroy() {
    if (this.eventImageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(this.eventImageUrl);
    }
    if (this.exponentImageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(this.exponentImageUrl);
    }
  }

  openShareDialog(): void {
    if (!this.eventDetails?.share) {
      this.showMessage('No hay enlace disponible para compartir');
      return;
    }
    
    this.dialog.open(CardShareEventComponent, {
      width: '500px',
      data: { shareUrl: this.eventDetails.share }
    });
  }

  goBack() {
    this.backToList.emit();
  }

  onRegister() {
    //this.router.navigate(['/payment', this.eventId]);
    console.log(this.eventId);
  }

  // ... resto de los métodos existentes (loadEventImages, etc.)
}
