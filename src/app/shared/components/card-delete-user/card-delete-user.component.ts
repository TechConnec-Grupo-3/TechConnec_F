import { Component, inject, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-delete-user',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './card-delete-user.component.html',
  styleUrl: './card-delete-user.component.css'
})
export class CardDeleteUserComponent {
  dialogRef = inject(MatDialogRef<CardDeleteUserComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { userName: string }) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
