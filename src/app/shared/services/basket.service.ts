import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICartItem } from '../../core/store/state/cart.state';
import { Store } from '@ngrx/store';
import { IProduct } from '../../core/interfaces/product.interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { selectProducts } from '../../core/store/selectors/product.selectors';
import { IAppState } from '../../core/store/state/app.state';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class BasketService {
  public basketItemsArray = new BehaviorSubject<any[]>([]);
  public products: IProduct[] = [];


  constructor(public store: Store<IAppState>) {
    this.store.select(selectProducts).pipe(untilDestroyed(this)).subscribe((products) => {
      this.products = products;
    });
  }

  isItemInBasket(productId: string): boolean {
    const items = this.basketItemsArray.value;
    return items.some(item => item.id === productId);
  }

  addBasketItem(item: any) {
    const currentItems = this.basketItemsArray.value;

    if (this.isItemInBasket(item.id)) {
      this.deleteItemCount(item);
    } else {
      this.basketItemsArray.next([...currentItems, { id: item.id, quantity: 1 }]);
    }
    this.setBasketLocalStorage(this.basketItemsArray.value);
  }

  increaseItemCount(item: any) {
    this.basketItemsArray.next([...this.basketItemsArray.value].map((el) => {
      if (el.id === item.id) {
        const productFromServer = this.products.find(product => product.id === el.id);

        if (productFromServer && el.quantity < productFromServer.quantity) {
          return {
            ...el,
            quantity: el.quantity + 1
          };
        }
      }
      return el;
    }));

    this.setBasketLocalStorage(this.basketItemsArray.value);
  }

  decreaseItemCount(item: any) {
    this.basketItemsArray.next([...this.basketItemsArray.value].map((el) => {
      if (el.id === item.id && el.quantity > 1) {
        return {
          id: el.id,
          quantity: el.quantity - 1
        };
      }
      return el;
    }));

    this.setBasketLocalStorage(this.basketItemsArray.value);
  }

  deleteItemCount(item: any) {
    this.basketItemsArray.next([...this.basketItemsArray.value].filter(el => el.id !== item.id));
    this.setBasketLocalStorage(this.basketItemsArray.value);
  }

  deleteAllItems() {
    this.basketItemsArray.next([]);
    this.setBasketLocalStorage(this.basketItemsArray.value);
  }

  setBasketLocalStorage(items: ICartItem[]) {
    localStorage.setItem('basketLocalStorage', JSON.stringify(items));
  }

  setInitialBasketData() {
    const data = localStorage.getItem('basketLocalStorage');
    if (data) {
      this.basketItemsArray.next(JSON.parse(data));
    }
  }
}
