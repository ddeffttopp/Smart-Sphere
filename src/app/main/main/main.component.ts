import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../shared/services/basket.service';
import { Store } from '@ngrx/store';
import { RestoreUser } from '../../core/store/actions/user.actions';
import { GetProduct } from '../../core/store/actions/product.actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  constructor(
    public basketService: BasketService,
    public store: Store
  ) {
  }

  ngOnInit() {
    this.basketService.setInitialBasketData();
    this.store.dispatch(new RestoreUser());
    this.store.dispatch(new GetProduct());
  }
}
