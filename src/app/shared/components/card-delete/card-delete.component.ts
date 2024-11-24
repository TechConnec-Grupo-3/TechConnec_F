import { Component, inject, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-card-delete',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './card-delete.component.html',
  styleUrl: './card-delete.component.css'
})
export class CardDeleteComponent {
  dialogRef = inject(MatDialogRef<CardDeleteComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { commentText: string }) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
