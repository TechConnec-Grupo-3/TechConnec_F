import { Component, Input, OnInit, inject } from '@angular/core';
import { CommentService, Comment, CommentCreate } from '../../core/services/comment.service';
import { CardCommentComponent } from '../../shared/components/card-comment/card-comment.component';
import { CommonModule, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../core/services/auth.service';
import { DialogAddCommentComponent } from './dialog-add-comment.component';

@Component({
  selector: 'app-event-comment',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    CardCommentComponent
  ],
  templateUrl: './event-comment.component.html',
  styleUrl: './event-comment.component.css'
})
export class EventCommentComponent implements OnInit {
  @Input() eventId!: number;
  
  private dialog = inject(MatDialog);
  private commentService = inject(CommentService);
  private authService = inject(AuthService);
  
  comments: Comment[] = [];

  ngOnInit() {
    if (this.eventId) {
      this.loadComments();
    }
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(DialogAddCommentComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newComment: CommentCreate = {
          eventId: this.eventId,
          userId: this.authService.getCurrentUserId() ?? 0, // Add null check with fallback
          comments: result
        };
        console.log(newComment);

        this.commentService.createComment(newComment).subscribe({
          next: () => {
            this.loadComments(); // Recargar comentarios después de agregar uno nuevo
          },
          error: (error) => {
            console.error('Error al crear comentario:', error);
          }
        });
      }
    });
  }

  loadComments() {
    this.commentService.getCommentsByEventId(this.eventId).subscribe({
      next: (comments) => {
        this.comments = comments;
        console.log(this.comments);
      },
      error: (error) => {
        console.error('Error loading comments:', error);
      }
    });
  }
}
