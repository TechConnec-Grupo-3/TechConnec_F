import {ChangeDetectionStrategy, Component, Input, Output, EventEmitter} from '@angular/core';
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
  @Input() buttonMode: 'view' | 'edit' | 'details' = 'view';
  @Output() buttonClicked = new EventEmitter<number>();

  onButtonClick() {
    this.buttonClicked.emit(this.event.id);
  }

  getButtonText(): string {
    switch(this.buttonMode) {
      case 'edit':
        return 'Editar';
      case 'details':
        return 'Detalles';
      default:
        return 'Ver más';
    }
  }
}
