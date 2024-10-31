import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { swiperConfig, swiperPagConfig } from '../../constants/swiper-options';
import { SwiperContainer } from 'swiper/swiper-element';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../core/store/state/app.state';
import { selectProductById, selectProducts } from '../../../core/store/selectors/product.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IProduct } from 'src/app/core/interfaces/product.interface';
import { environments } from '../../../../environments';
import { of, switchMap } from 'rxjs';
import { StarsService } from '../../services/stars.service';
import { LikeService } from '../../services/like.service';
import { MatDialog } from '@angular/material/dialog';
import { DeliveryCityComponent } from '../delivery-city/delivery-city.component';
import { CityService } from '../../services/city.service';

@UntilDestroy()
@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  public mainSwiperConfig = swiperConfig;
  public pagSwiperConfig = swiperPagConfig;
  public selectedCard!: IProduct;
  public products: IProduct[] = [];
  imageUrl = `${environments.apiUrl}${environments.imageUrl}`;
  public averageStars: { filledCount: number; emptyCount: number } = {
    filledCount: 0,
    emptyCount: 5
  };
  commentsCount = 0;
  commentsText = '';
  isLiked = false;
  public activeColor = false;

  @ViewChild('swiper') swiper!: ElementRef<SwiperContainer>;
  @ViewChild('swiperThumbs') swiperThumbs!: ElementRef<SwiperContainer>;

  constructor(
    private store: Store<IAppState>,
    private route: ActivatedRoute,
    public starsService: StarsService,
    private likeService: LikeService,
    public dialog: MatDialog,
    public cityService: CityService,
  ) {
    this.route.parent?.paramMap.pipe(
      switchMap(params => {
        const idParam = params.get('id');
        if (idParam) {
          return this.store.select(selectProductById(idParam));
        }
        return of(null);
      }),
      untilDestroyed(this)
    ).subscribe((product) => {
      if (product) {
        this.selectedCard = product;
      }

      this.commentsCount = this.selectedCard?.comments.length || 0;
      this.commentsText = this.starsService.getReviewWord(this.commentsCount);
      this.updateStars();
    });
  }

  ngOnInit() {
    this.store.select(selectProducts).pipe(untilDestroyed(this)).subscribe((products) => {
      this.products = products;
    })
  }

  updateStars() {
    if (this.selectedCard && this.selectedCard.comments) {
      this.averageStars = this.starsService.calculateAverageStars(this.selectedCard.comments);
    } else {
      this.averageStars = { filledCount: 0, emptyCount: 5 };
    }
  }

  toggleLike(event: Event) {
    event.stopPropagation();
    this.isLiked = !this.isLiked;
    this.likeService.toggleLike();
  }

  deliveryCity() {
    this.dialog.open(DeliveryCityComponent, {});
  }
}
