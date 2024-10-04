import { Component, Input, OnInit } from '@angular/core';
import { StarsService } from '../../services/stars.service';
import { selectProducts } from '../../../core/store/selectors/product.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../core/store/state/app.state';
import { IProduct } from '../../../core/interfaces/product.interface';

@UntilDestroy()
@Component({
  selector: 'app-average-stars',
  templateUrl: './average-stars.component.html',
  styleUrls: ['./average-stars.component.scss']
})
export class AverageStarsComponent implements OnInit {
  @Input() product!: IProduct;
  public products: IProduct[] = [];
  public averageStars: { filledCount: number; emptyCount: number } = {
    filledCount: 0,
    emptyCount: 5
  };

  constructor(
    private store: Store<IAppState>,
    public starsService: StarsService
  ) {
  }

  ngOnInit() {
    this.updateStars();

    this.store
      .select(selectProducts)
      .pipe(untilDestroyed(this))
      .subscribe((products) => {
        this.products = products;
      })
  }

  updateStars() {
    if (this.product && this.product.comments) {
      this.averageStars = this.starsService.calculateAverageStars(this.product.comments);
    } else {
      this.averageStars = { filledCount: 0, emptyCount: 5 };
    }
  }

}
