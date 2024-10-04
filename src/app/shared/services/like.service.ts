import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private likeCountSubject = new BehaviorSubject<number>(0);

  likeCount$ = this.likeCountSubject.asObservable();
  private likeCount = 0;

  toggleLike() {
    this.likeCount = this.likeCount === 0 ? 1 : 0;
    this.likeCountSubject.next(this.likeCount);
  }
}
