import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Output, EventEmitter } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-card-delete',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './card-delete.component.html',
  styleUrl: './card-delete.component.css'
})
export class CardDeleteComponent {
  constructor(
  ) {}
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
