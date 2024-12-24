import { Component, Input } from '@angular/core';
import { IProduct } from '../../../core/interfaces/product.interface';
import { environments } from '../../../../environments';

@Component({
  selector: 'app-product-alike',
  templateUrl: './product-alike.component.html',
  styleUrls: ['./product-alike.component.scss']
})
export class ProductAlikeComponent {
  private _selectProduct!: IProduct;

  @Input() set selectProduct(v: IProduct) {
    this._selectProduct = v;
    this.filterAndRandomizeProducts();
  };

  @Input() products: IProduct[] = [];

  imageUrl = `${environments.apiUrl}${environments.imageUrl}`;
  randomProducts: IProduct[] = [];

  get selectProduct(): IProduct {
    return this._selectProduct;
  }

  filterAndRandomizeProducts(): void {
    const filteredProducts = this.products.filter(p => p.id !== this.selectProduct.id);

    this.randomProducts = this.shuffleArray(filteredProducts).slice(0, 5);
  }

  shuffleArray(array: IProduct[]): IProduct[] {
    return array;
  }
}
