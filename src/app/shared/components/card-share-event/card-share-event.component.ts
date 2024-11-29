import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card-share-event',
  templateUrl: './card-share-event.component.html',
  styleUrls: ['./card-share-event.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule
  ]
})
export class CardShareEventComponent {
  constructor(
    public dialogRef: MatDialogRef<CardShareEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { shareUrl: string },
    private clipboard: Clipboard,
    private snackBar: MatSnackBar
  ) {}

  copyLink(): void {
    this.clipboard.copy(this.data.shareUrl);
    this.snackBar.open('Enlace copiado al portapapeles', 'Cerrar', {
      duration: 3000
    });
  }

  closeCard(): void {
    this.dialogRef.close();
  }
}
