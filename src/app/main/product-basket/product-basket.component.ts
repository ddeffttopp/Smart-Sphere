import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from '../../shared/services/basket.service';
import { ICartItem } from '../../core/store/state/cart.state';
import { Store } from '@ngrx/store';
import { selectProductById } from '../../core/store/selectors/product.selectors';
import { IAppState } from '../../core/store/state/app.state';
import { environments } from '../../../environments';

@Component({
  selector: 'app-product-basket',
  templateUrl: './product-basket.component.html',
  styleUrls: ['./product-basket.component.scss']
})
export class ProductBasketComponent {
  basketItems$: Observable<any[]>;
  imageUrl = `${environments.apiUrl}${environments.imageUrl}`;

  constructor(
    public store: Store<IAppState>,
    private basketService: BasketService
  ) {
    this.basketItems$ = this.basketService.basketItemsArray.asObservable();
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
}
