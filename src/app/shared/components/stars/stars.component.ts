import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../core/store/state/app.state';
import { StarsService } from '../../services/stars.service';
import { IProduct } from '../../../core/interfaces/product.interface';
import { selectProducts } from '../../../core/store/selectors/product.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit {
  @Input() product!: IProduct;
  @Input() reviews!: { username: string; userId: string; text: string; stars: number };
  public products: IProduct[] = [];

  constructor(
    private store: Store<IAppState>,
    public starsService: StarsService
  ) {
  }

  ngOnInit() {
    this.store
      .select(selectProducts)
      .pipe(untilDestroyed(this))
      .subscribe((products) => {
        this.products = products;
      })
  }
}
