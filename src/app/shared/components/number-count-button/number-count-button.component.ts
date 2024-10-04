import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-number-count-button',
  templateUrl: './number-count-button.component.html',
  styleUrls: ['./number-count-button.component.scss']
})
export class NumberCountButtonComponent implements OnChanges {
  @Input() item: any;
  count: number = 1;
  availableQuantity: number = 0; // Новая переменная для хранения доступного количества

  constructor(private basketService: BasketService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.count = this.item.quantity;
    this.setAvailableQuantity(); // Устанавливаем доступное количество при изменении входных данных
  }

  private setAvailableQuantity(): void {
    const product = this.basketService.products.find(p => p.id === this.item.id);
    this.availableQuantity = product ? product.quantity : 0; // Получаем количество товара с сервера
  }

  onIncrement(): void {
    this.basketService.increaseItemCount(this.item);
    this.setAvailableQuantity(); // Обновляем доступное количество после увеличения
  }

  onDecrement(): void {
    if (this.item.quantity > 1) {
      this.basketService.decreaseItemCount(this.item);
    }
  }

  onInputChange(value: string): void {
    const newValue = Number(value);
    if (!isNaN(newValue) && newValue >= 1) {
      this.item.quantity = newValue;
      this.count = newValue;
      this.basketService.basketItemsArray.next([...this.basketService.basketItemsArray.value]);
      this.basketService.setBasketLocalStorage(this.basketService.basketItemsArray.value);
    }
  }

  onBlur(): void {
    if (this.count === null || this.count === undefined || this.count === 0 || String(this.count).trim() === '') {
      this.count = 1;
      this.item.quantity = 1;
      this.basketService.basketItemsArray.next([...this.basketService.basketItemsArray.value]);
      this.basketService.setBasketLocalStorage(this.basketService.basketItemsArray.value);
    }
  }
}
