import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatLabel } from '@angular/material/form-field';
import { CardNotificationComponent } from '../../shared/components/card-notification/card-notification.component';
import { NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CardEventComponent } from '../../shared/components/card-event/card-event.component';
import { NotificationResponse } from '../../shared/models/notification-response';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-event-notification',
  standalone: true,
  imports: [MatLabel, MatCardModule, CardNotificationComponent, MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, 
    MatToolbar,MatButtonModule,CardEventComponent, NgFor],
  templateUrl: './event-notification.component.html',
  styleUrl: './event-notification.component.css'
})
export class EventNotificationComponent implements OnInit{

  options: string[] = ['Hoy', 'Mañana', 'Proximos'];
  filteredOptions: string[] = this.options;
  searchTerm: string = '';
  notifications: NotificationResponse[] = [];

  private notificationService = inject(NotificationService);


  filterOptions() {
    this.filteredOptions = this.options.filter(option =>
      option.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe({
      next: (notification) => {
        this.notifications = notification;
      },
      error: (error) =>
        console.error('Error al cargar las notificaciones recientes', error),
    });
  }  
}
