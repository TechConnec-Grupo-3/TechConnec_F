import {ChangeDetectionStrategy, Component, Input, inject, Output, EventEmitter, Inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';

import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Comment, CommentService } from '../../../core/services/comment.service';
import { AuthService } from '../../../core/services/auth.service';
import { NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardDeleteComponent } from '../card-delete/card-delete.component';

@Component({
  selector: 'app-card-comment',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatDialogModule,
    NgIf
  ],
  templateUrl: './card-comment.component.html',
  styleUrl: './card-comment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardCommentComponent {
  @Input() comment!: Comment;
  @Output() commentUpdated = new EventEmitter<void>();

  private readonly dialog = inject(MatDialog);
  private readonly authService = inject(AuthService);
  private readonly commentService = inject(CommentService);

  get isCurrentUserComment(): boolean {
    return this.comment.userId === this.authService.getCurrentUserId();
  }

  openDialog() {
    if (!this.isCurrentUserComment) return;
    
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      width: '500px',
      data: { currentComment: this.comment.comments }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.commentService.updateComment(this.comment.commentId, result)
          .subscribe({
            next: () => {
              this.commentUpdated.emit(); // Recargar comentarios
            },
            error: (error) => {
              console.error('Error al actualizar comentario:', error);
            }
          });
      }
    });
  }

  deleteComment(): void {
    if (!this.isCurrentUserComment) return;

    const dialogRef = this.dialog.open(CardDeleteComponent, {
      width: '400px',
      data: { commentText: this.comment.comments }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.commentService.deleteComment(this.comment.commentId)
          .subscribe({
            next: () => {
              this.commentUpdated.emit(); // Recargar comentarios
            },
            error: (error) => {
              console.error('Error al eliminar comentario:', error);
            }
          });
      }
    });
  }
}
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-comment-edit.html',
  styleUrl: './dialog-comment-edit.component.css',
  standalone: true,
  imports: [
    MatDialogModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    ReactiveFormsModule,
    NgIf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleDialog {
  commentControl = new FormControl('', [Validators.required]);
  
  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { currentComment: string }
  ) {
    this.commentControl.setValue(data.currentComment);
  }

  onSubmit(): void {
    if (this.commentControl.valid) {
      this.dialogRef.close(this.commentControl.value);
    }
  }
}
