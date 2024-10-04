import { Component, OnInit } from '@angular/core';
import { selectProducts } from '../../core/store/selectors/product.selectors';
import { Store } from '@ngrx/store';
import { IAppState } from '../../core/store/state/app.state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IProduct } from '../../core/interfaces/product.interface';

@UntilDestroy()
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public products: IProduct[] = [];

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.store.select(selectProducts).pipe(untilDestroyed(this)).subscribe((products) => {
      this.products = products;
    })
  }
}
