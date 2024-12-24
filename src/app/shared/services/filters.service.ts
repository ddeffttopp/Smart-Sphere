import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { selectProducts } from '../../core/store/selectors/product.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from '../../core/store/state/app.state';
import { availability, categories, color } from '../constants/filter-options';
import { IProduct } from '../../core/interfaces/product.interface';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  public products: IProduct[] = [];

  maxPriceValue: number = 0;
  isPriceValid = true;
  private filtersSubject = new BehaviorSubject<any>({
    selectedCategory: 'all',
    selectedAvailability: 'all',
    selectedColor: 'all',
    price: { from: 0, to: this.maxPriceValue }
  });

  startFilter = {
    selectedCategory: 'all',
    selectedAvailability: 'all',
    selectedColor: 'all',
    price: { from: 0, to: this.maxPriceValue }
  }

  filters$ = this.filtersSubject.asObservable();

  categoriesForm: FormGroup;
  availabilityForm: FormGroup;
  colorForm: FormGroup;
  priceForm: FormGroup;

  public categories = categories;
  public availability = availability;
  public color = color;

  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState>
  ) {
    this.categoriesForm = this.fb.group({
      selectedCategory: ['all']
    });
    this.availabilityForm = this.fb.group({
      selectedAvailability: ['all']
    });
    this.colorForm = this.fb.group({
      selectedColor: ['all']
    });
    this.priceForm = this.fb.group({
      from: [0, [Validators.required, Validators.min(0)]],
      to: [0, [Validators.required, Validators.min(0)]]
    });

    this.store.select(selectProducts).pipe(
      untilDestroyed(this),
      tap((products) => {
        this.products = products;

        const uniqueColors = Array.from(new Set(products.map(product => product.cssColor)));

        this.color = [
          { key: 'all', label: 'Всі' },
          ...uniqueColors.map(uniqueColor => {
            const productWithColor = products.find(product => product.cssColor === uniqueColor);
            return {
              key: uniqueColor,
              label: productWithColor ? productWithColor.color : uniqueColor
            };
          })
        ].filter(colorObj => colorObj.label);

        if (products.length > 0) {
          this.maxPriceValue = products.reduce((max, product) => {
            return product.price > max ? product.price : max;
          }, 0);

          // Обновляем форму цены
          this.priceForm.patchValue({ to: this.maxPriceValue });
        }

        this.onSubmitPrice();
      })
    ).subscribe();

    this.priceForm.get('from')?.valueChanges.pipe(untilDestroyed(this)).subscribe(value => {
      this.isPriceValid = value >= 0 && value < this.priceForm.value.to;
    });

    this.priceForm.get('to')?.valueChanges.pipe(untilDestroyed(this)).subscribe(value => {
      this.isPriceValid = value <= this.maxPriceValue && value > this.priceForm.value.from;
    });
  }

  setFilters(filters: any) {
    this.filtersSubject.next(filters);
  }

  resetFilters() {
    this.categoriesForm.patchValue({ selectedCategory: 'all' });
    this.availabilityForm.patchValue({ selectedAvailability: 'all' });
    this.colorForm.patchValue({ selectedColor: 'all' });
    this.priceForm.patchValue({ from: 0, to: this.maxPriceValue });

    this.categories = categories;
    this.availability = availability;
    this.color = color;

    const defaultFilters = {
      ...this.startFilter,
      price: { from: 0, to: this.maxPriceValue }
    };

    this.filtersSubject.next(defaultFilters);
  }

  getFilters() {
    return this.filtersSubject.value;
  }

  onSubmitCategories() {
    const selectedCategory = this.categoriesForm.get('selectedCategory')?.value;
    this.setFilters({ ...this.getFilters(), selectedCategory });
  }

  onSubmitAvailability() {
    const selectedAvailability = this.availabilityForm.get('selectedAvailability')?.value;
    this.setFilters({ ...this.getFilters(), selectedAvailability });
  }

  onSubmitColor() {
    const selectedColor = this.colorForm.get('selectedColor')?.value;
    this.setFilters({ ...this.getFilters(), selectedColor });
  }

  onSubmitPrice() {
    const fromPrice = this.priceForm.get('from')?.value;
    const toPrice = this.priceForm.get('to')?.value;

    this.setFilters({
      ...this.getFilters(),
      price: { from: fromPrice, to: toPrice }
    });
  }
}
