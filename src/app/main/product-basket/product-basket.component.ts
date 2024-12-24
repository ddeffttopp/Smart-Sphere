import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { BasketService } from '../../shared/services/basket.service';
import { ICartItem } from '../../core/store/state/cart.state';
import { Store } from '@ngrx/store';
import { selectProductById } from '../../core/store/selectors/product.selectors';
import { IAppState } from '../../core/store/state/app.state';
import { environments } from '../../../environments';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-basket',
  templateUrl: './product-basket.component.html',
  styleUrls: ['./product-basket.component.scss']
})
export class ProductBasketComponent implements OnInit {
  basketItems$: Observable<any[]>;
  imageUrl = `${environments.apiUrl}${environments.imageUrl}`;
  totalPrice = 0;

  constructor(
    public store: Store<IAppState>,
    private basketService: BasketService,
    public dialog: MatDialog
  ) {
    this.basketItems$ = this.basketService.basketItemsArray.asObservable();
  }

  ngOnInit() {
    this.calculateTotalPrice();
    this.basketItems$.subscribe(() => {
      this.calculateTotalPrice();
    });
  }

  removeItem(item: ICartItem): void {
    this.basketService.deleteItemCount(item);
  }

  clearCart(): void {
    this.basketService.deleteAllItems();
  }

  getProductDetails(productId: string) {
    return this.store.select(selectProductById(productId));
  }

  calculateTotalPrice() {
    this.basketItems$.pipe(
      map(items => {
        return items.map(cartItem =>
          this.store.select(selectProductById(cartItem.id)).pipe(
            map(product => ({
              price: product ? product.price : 0,
              quantity: cartItem.quantity
            }))
          )
        );
      }),
      switchMap(productObservables =>
        combineLatest(productObservables)),
      map(products => {
        return products.reduce((acc, { price, quantity }) =>
          acc + (price * quantity), 0);
      })
    ).subscribe(total => {
      this.totalPrice = total;
    });
  }
}
