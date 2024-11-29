import {ChangeDetectionStrategy, Component} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatLabel } from '@angular/material/form-field';
import { inject, Input } from '@angular/core';
import { NotificationResponse } from '../../models/notification-response';

@Component({
  selector: 'app-card-notification',
  standalone: true,
  imports: [MatLabel, MatCardModule],
  templateUrl: './card-notification.component.html',
  styleUrl: './card-notification.component.css'
})
export class CardNotificationComponent {
  @Input() notification!: NotificationResponse;
}
