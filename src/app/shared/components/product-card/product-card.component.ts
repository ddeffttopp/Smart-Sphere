import {Component, Input, OnInit} from '@angular/core';
import {LikeBasketService} from '../../services/like-basket.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})

export class ProductCardComponent implements OnInit {
  @Input() card: any;
  averageStars: number[] = [];
  isLiked: boolean = false;
  isBasket: boolean = false;

  constructor(private likeBasketService: LikeBasketService) {
  }

  toggleLike(event: Event) {
    event.stopPropagation();
    this.isLiked = !this.isLiked;
    this.likeBasketService.toggleLike();
  }

  toggleBasket(event: Event) {
    event.stopPropagation();
    this.isBasket = !this.isBasket;
    this.likeBasketService.toggleBasket();
  }

  ngOnInit() {
    this.calculateAverageStars();
  }

  calculateAverageStars() {
    const reviews = this.card.review;
    const totalStars = reviews.reduce((sum: number, review: any) => sum + review.stars, 0);
    this.averageStars = Array(Math.round(totalStars / reviews.length));
  }
}
