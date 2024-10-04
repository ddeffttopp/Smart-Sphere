import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BasketService } from '../../services/basket.service';
import { swiperConfig } from "../../constants/swiper-options";
import { LikeService } from '../../services/like.service';
import { Subscription } from 'rxjs';
import { environments } from '../../../../environments';
import { IProduct } from '../../../core/interfaces/product.interface';
import { StarsService } from '../../services/stars.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})

export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() card!: IProduct;
  @Input() productId: number | undefined;
  public averageStars: { filledCount: number; emptyCount: number } = {
    filledCount: 0,
    emptyCount: 5
  };
  isLiked: boolean = false;
  isBasket: boolean = false;
  imageUrl = `${environments.apiUrl}${environments.imageUrl}`;
  public mainSwiperConfig = { ...swiperConfig, autoplay: { delay: 3000 }, navigation: false };

  @Output()
  cardClick: EventEmitter<void> = new EventEmitter<void>();

  private basketSubscription: Subscription | undefined;

  constructor(
    private basketService: BasketService,
    private likeService: LikeService,
    private starsService: StarsService
  ) {
  }

  ngOnInit() {
    this.updateStars();
    this.basketSubscription = this.basketService.basketItemsArray.subscribe(() => {
      this.updateBasketStatus();
    });
    this.updateBasketStatus();
  }

  ngOnDestroy() {
    if (this.basketSubscription) {
      this.basketSubscription.unsubscribe();
    }
  }

  toggleLike(event: Event) {
    event.stopPropagation();
    this.isLiked = !this.isLiked;
    this.likeService.toggleLike();
  }

  toggleBasket(event: Event) {
    event.stopPropagation();
    this.basketService.addBasketItem(this.card);
  }

  updateBasketStatus() {
    if (this.card.id !== undefined) {
      this.isBasket = this.basketService.isItemInBasket(this.card.id);
    }
  }

  updateStars() {
    if (this.card && this.card.comments) {
      this.averageStars = this.starsService.calculateAverageStars(this.card.comments);
    } else {
      this.averageStars = { filledCount: 0, emptyCount: 5 };
    }
  }

  createArray(length: number): number[] {
    return Array(length).fill(0);
  }
}
