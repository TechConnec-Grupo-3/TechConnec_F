import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Comment {
  commentId: number;
  eventId: number;
  userId: number;
  userName: string;
  comments: string;
  submittedAt: string;
}

export interface CommentCreate {
  eventId: number;
  userId: number;
  comments: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private http = inject(HttpClient);
  private baseURL = `${environment.apiUrl}/comment`;

  getCommentsByEventId(eventId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseURL}/event/${eventId}`);
  }

  createComment(comment: CommentCreate): Observable<any> {
    return this.http.post(`${this.baseURL}`, comment);
  }

  updateComment(commentId: number, comments: string): Observable<any> {
    return this.http.put(`${this.baseURL}/${commentId}`, { comments });
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${commentId}`);
  }
} 