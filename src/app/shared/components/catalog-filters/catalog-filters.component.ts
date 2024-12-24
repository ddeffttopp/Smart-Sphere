import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IProduct } from '../../../core/interfaces/product.interface';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../core/store/state/app.state';
import { selectProducts } from '../../../core/store/selectors/product.selectors';
import { FiltersService } from '../../services/filters.service';

@UntilDestroy()
@Component({
  selector: 'app-catalog-filters',
  templateUrl: './catalog-filters.component.html',
  styleUrls: ['./catalog-filters.component.scss']
})
export class CatalogFiltersComponent implements OnInit {
  public products: IProduct[] = [];
  filtersOpen: boolean[] = [false, false, false, false];

  constructor(
    private store: Store<IAppState>,
    public filtersService: FiltersService
  ) {
  }

  ngOnInit() {
    this.store.select(selectProducts).pipe(untilDestroyed(this)).subscribe((products) => {
      this.products = products;
    })
  }

  toggleFilter(index: number) {
    this.filtersOpen[index] = !this.filtersOpen[index];
  }
}
