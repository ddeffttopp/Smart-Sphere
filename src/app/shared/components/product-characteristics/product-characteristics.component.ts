import { Component, OnInit, Output } from '@angular/core';
import { IProduct } from '../../../core/interfaces/product.interface';
import { Store } from '@ngrx/store';
import { selectProductById, selectProducts } from '../../../core/store/selectors/product.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IAppState } from '../../../core/store/state/app.state';
import { of, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-product-characteristics',
  templateUrl: './product-characteristics.component.html',
  styleUrls: ['./product-characteristics.component.scss']
})
export class ProductCharacteristicsComponent implements OnInit {
  @Output() selectedCard!: IProduct;
  public products: IProduct[] = [];

  constructor(
    private store: Store<IAppState>,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
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
    });

    this.store.select(selectProducts).pipe(untilDestroyed(this)).subscribe((products) => {
      this.products = products;
    })
  }
}
