import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectProductById } from '../../core/store/selectors/product.selectors';
import { GetSingleProduct } from '../../core/store/actions/product.actions';
import { IAppState } from '../../core/store/state/app.state';
import { ProductsService } from '../services/products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<any> {
  constructor(
    private productService: ProductsService,
    private store: Store<IAppState>
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const productId = route.paramMap.get('id');
    if (!productId) {
      return of(null);
    }

    return this.store.select(selectProductById(productId)).pipe(
      switchMap(productInStore => {
        if (productInStore)
          return of(productInStore);
        else {
          return this.productService.getProducts({ filter: `id:${productId}` }).pipe(
            map((response: any) => {
              const product = response[0];
              this.store.dispatch(new GetSingleProduct(product));
              return product;
            }),
            catchError(() => of(null))
          );
        }
      })
    );
  }
}
