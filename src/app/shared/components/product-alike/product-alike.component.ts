import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../../core/interfaces/product.interface';
import { environments } from '../../../../environments';

@Component({
  selector: 'app-product-alike',
  templateUrl: './product-alike.component.html',
  styleUrls: ['./product-alike.component.scss']
})
export class ProductAlikeComponent implements OnInit {
  @Input() selectProduct!: IProduct;
  @Input() products!: IProduct[];
  imageUrl = `${environments.apiUrl}${environments.imageUrl}`;
  randomProducts: IProduct[] = [];

  ngOnInit(): void {
    this.filterAndRandomizeProducts();
  }

  filterAndRandomizeProducts(): void {
    const filteredProducts = this.products.filter(p => p.id !== this.selectProduct.id);

    this.randomProducts = this.shuffleArray(filteredProducts).slice(0, 5);
  }

  // Функция для перемешивания массива
  shuffleArray(array: IProduct[]): IProduct[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
