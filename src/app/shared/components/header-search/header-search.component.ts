import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, of, switchMap } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../../core/interfaces/product.interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { environments } from '../../../../environments';

@UntilDestroy()
@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss']
})
export class HeaderSearchComponent implements OnInit {
  searchFormControl = new FormControl('');
  showProductList: boolean = false;
  searchProducts: IProduct[] = [];
  imageUrl = `${environments.apiUrl}${environments.imageUrl}`;

  constructor(private productService: ProductsService) {
  }

  ngOnInit(): void {
    this.searchFormControl.valueChanges
      .pipe(
        untilDestroyed(this),
        debounceTime(500),
        switchMap((value) => {
          if (value !== null) {
            const trimmedValue = value.trim();
            return trimmedValue !== '' ? this.productService.getProducts({ filter: `name:${trimmedValue}` }) : of([]);
          }
          return of([]);
        })
      )
      .subscribe((res: any) => {
        this.searchProducts = res.length > 0 ? res[0].slice(0, 5) : [];
      });
  }


  onFocusInput() {
    this.showProductList = true;
  }

  onToggleProduct() {
    this.searchFormControl.setValue('');
    this.showProductList = false;
    this.searchProducts = [];
  }
}
