import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StarsService } from '../../services/stars.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { IProduct } from '../../../core/interfaces/product.interface';

@UntilDestroy()
@Component({
  selector: 'app-average-stars',
  templateUrl: './average-stars.component.html',
  styleUrls: ['./average-stars.component.scss']
})
export class AverageStarsComponent implements OnChanges {
  @Input() product!: IProduct;
  public averageStars: { filledCount: number; emptyCount: number } = {
    filledCount: 0,
    emptyCount: 5
  };

  constructor(public starsService: StarsService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && changes['product'].currentValue) {
      this.updateStars();
    }
  }

  updateStars() {
    if (this.product && this.product.comments) {
      this.averageStars = this.starsService.calculateAverageStars(this.product.comments);
    } else {
      this.averageStars = { filledCount: 0, emptyCount: 5 };
    }
  }
}
