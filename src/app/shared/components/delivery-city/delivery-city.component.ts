import { Component, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CityService } from '../../services/city.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delivery-city',
  templateUrl: './delivery-city.component.html',
  styleUrls: ['./delivery-city.component.scss'],
})
export class DeliveryCityComponent implements OnInit {
  public dialogRef = inject(MatDialogRef<DeliveryCityComponent>);
  cityFormControl = new FormControl(this.cityService.selectCity);
  cities: any[] = [];
  filteredCities: any[] = [];
  showCityList: boolean = false;
  popularCities: string[] = ['Київ', 'Харків', 'Одеса', 'Дніпро', 'Львів', 'Запоріжжя'];
  selectedPopularCity: string | null = null;
  isCityChanged = false;

  constructor(private cityService: CityService) {
  }

  ngOnInit(): void {
    this.cityService
      .getCities()
      .subscribe((response: any) => {
        this.cities = response.data;
        this.filteredCities = this.cities;
      });

    this.cityFormControl.valueChanges
      .subscribe(value => {
        this.filteredCities = this.getFilteredCities(value || '');
      });

    if (this.popularCities.includes(this.cityService.selectCity)) {
      this.selectedPopularCity = this.cityService.selectCity;
    }
  }

  selectCity(city: any): void {
    this.cityFormControl.setValue(city.Description);
    this.showCityList = false;
    this.cityService.selectCity = city.Description;
    this.checkIfCityChanged(city.Description);

    if (this.popularCities.includes(city.Description)) {
      this.selectedPopularCity = city.Description;
    } else {
      this.selectedPopularCity = null;
    }
  }

  selectPopularCity(city: string): void {
    this.cityFormControl.setValue(city);
    this.showCityList = false;
    this.selectedPopularCity = city;
    this.cityService.selectCity = city;
    this.checkIfCityChanged(city);
  }

  checkIfCityChanged(value: string | null): void {
    this.isCityChanged = value !== this.cityService.oldSelectedCity;
  }

  getFilteredCities(value: string): any[] {
    const searchTerm = value.toLowerCase();
    return this.cities
      .filter(city => city.Description.toLowerCase().startsWith(searchTerm))
      .slice(0, 10);
  }

  selectDelivery() {
    this.cityService.oldSelectedCity = this.cityService.selectCity;
    this.dialogRef.close();
  }
}
