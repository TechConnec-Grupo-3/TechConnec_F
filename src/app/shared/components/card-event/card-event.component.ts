import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { EventConsoleResponse } from '../../models/event-console-response';

@Component({
  selector: 'app-card-event',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatChipsModule],
  templateUrl: './card-event.component.html',
  styleUrl: './card-event.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardEventComponent {
  @Input() event!: EventConsoleResponse;
}
