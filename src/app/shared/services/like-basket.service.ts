import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeBasketService {
  private likeCountSubject = new BehaviorSubject<number>(0);
  private basketCountSubject = new BehaviorSubject<number>(0);

  likeCount$ = this.likeCountSubject.asObservable();
  basketCount$ = this.basketCountSubject.asObservable();

  private likeCount = 0;
  private basketCount = 0;

  toggleLike() {
    this.likeCount = this.likeCount === 0 ? 1 : 0;
    this.likeCountSubject.next(this.likeCount);
  }

  toggleBasket() {
    this.basketCount = this.basketCount === 0 ? 1 : 0;
    this.basketCountSubject.next(this.basketCount);
  }

  constructor() { }
}
