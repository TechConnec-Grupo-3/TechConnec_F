import { Component, Inject, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dialog-add-comment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule, NgIf
  ],
  template: `
    <h2 mat-dialog-title>Agregar Comentario</h2>
    <mat-dialog-content>
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Comentario</mat-label>
        <textarea matInput 
                  [formControl]="commentControl" 
                  placeholder="Escribe tu comentario aquí"
                  rows="4"></textarea>
        <mat-error *ngIf="commentControl.hasError('required')">
          El comentario es requerido
        </mat-error>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-raised-button 
              color="primary" 
              [disabled]="!commentControl.valid"
              (click)="onSubmit()">
        Agregar
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `.full-width { width: 100%; }`
  ]
})
export class DialogAddCommentComponent {
  commentControl = new FormControl('', [Validators.required]);
  
  constructor(
    public dialogRef: MatDialogRef<DialogAddCommentComponent>
  ) {}

  onSubmit(): void {
    if (this.commentControl.valid) {
      this.dialogRef.close(this.commentControl.value);
    }
  }
}
