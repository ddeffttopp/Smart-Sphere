import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProductComment } from '../../core/interfaces/comment.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  public addComment(productId: string, comment: IProductComment): Observable<IProductComment> {
    return this.http.patch<IProductComment>(`http://localhost:3000/products/comment/${productId}`, comment);
  }

  public deleteComment(productId: string, commentId: string): Observable<void> {
    return this.http.patch<void>(`http://localhost:3000/products/comment-del/${productId}`, { id: commentId });
  }
}
