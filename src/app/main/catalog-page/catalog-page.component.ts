import { Component, OnInit } from '@angular/core';
import { selectProducts } from '../../core/store/selectors/product.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IProduct } from '../../core/interfaces/product.interface';
import { IAppState } from '../../core/store/state/app.state';
import { Store } from '@ngrx/store';
import { FiltersService } from '../../shared/services/filters.service';
import { combineLatest, map } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent implements OnInit {
  public products: IProduct[] = [];
  selectedSortOption = 'Спочатку дешевші';
  isDropdownOpen: boolean = false;
  productCount = 3;
  isLoading = true;

  constructor(
    private store: Store<IAppState>,
    public filtersService: FiltersService
  ) {
  }
  
  ngOnInit() {
    combineLatest([
      this.store.select(selectProducts),
      this.filtersService.filters$
    ])
      .pipe(
        untilDestroyed(this),
        map(([products, filters]) => {
          const filteredProducts = products.filter(product =>
            Object.entries(filters).every(([filterKey, filterValue]) =>
              this.applyFilter(product, filterKey, filterValue)
            )
          );
          return this.sortProducts(filteredProducts);
        }),
      )
      .subscribe((sortedProducts) => {
        this.products = sortedProducts;

        if (this.products.length > 0) {
          setTimeout(() => {
            this.isLoading = false;
          }, 3000);
        }
      });
  }

  selectOption(option: string) {
    this.selectedSortOption = option;
    this.isDropdownOpen = false;
    this.products = this.sortProducts(this.products);
  }

  sortProducts(products: IProduct[]): IProduct[] {
    switch (this.selectedSortOption) {
      case 'Спочатку дешевші':
        return products.slice().sort((a, b) => a.price - b.price);
      case 'Спочатку дорожчі':
        return products.slice().sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  }

  applyFilter(product: IProduct, filterKey: string, filterValue: any) {
    switch (filterKey) {
      case 'selectedCategory':
        return filterValue === 'all' || product.productType === filterValue;
      case 'selectedAvailability':
        if (filterValue === 'all') return true;
        return filterValue === 'true' ? product.quantity > 0 : product.quantity === 0;
      case 'selectedColor':
        return filterValue === 'all' || product.cssColor === filterValue;
      case 'price':
        return product.price >= filterValue.from && product.price <= filterValue.to;
      default:
        return true;
    }
  };

  get canLoadMore() {
    return this.productCount < this.products.length;
  }
}
