import { Component, OnInit, Output } from '@angular/core';
import { IProduct } from '../../../core/interfaces/product.interface';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../core/store/state/app.state';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap, take } from 'rxjs';
import { selectProductById, selectProducts } from '../../../core/store/selectors/product.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog } from '@angular/material/dialog';
import { WriteReviewsComponent } from '../write-reviews/write-reviews.component';
import { isUserLogin, userInfo } from '../../../core/store/selectors/user.selectors';
import { IUserState } from '../../../core/store/state/user.state';
import { DeleteComment } from '../../../core/store/actions/product.actions';
import { AuthService } from '../../services/auth.service';

@UntilDestroy()
@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss']
})
export class ProductReviewsComponent implements OnInit {
  @Output() selectedCard!: IProduct;
  public products: IProduct[] = [];
  public userInfo!: IUserState;
  isUserLogin$: Observable<boolean> = this.store.select(isUserLogin);

  constructor(
    private store: Store<IAppState>,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public authService: AuthService
  ) {
  }

  ngOnInit() {
    this.route.parent?.paramMap.pipe(
      switchMap(params => {
        const idParam = params.get('id');
        if (idParam) {
          return this.store.select(selectProductById(idParam));
        }
        return of(null);
      }),
      untilDestroyed(this)
    ).subscribe((product) => {
      if (product) {
        this.selectedCard = product;
      }

    });

    this.store.select(selectProducts).pipe(untilDestroyed(this)).subscribe((products) => {
      this.products = products;
    });

    this.store.select(userInfo).pipe(untilDestroyed(this)).subscribe(user => {
      this.userInfo = user;
    });


  }

  onToggleWrite() {
    this.isUserLogin$.pipe(take(1)).subscribe(isUserLogin => {
      if (isUserLogin) {
        this.dialog.open(WriteReviewsComponent, {
          data: {
            selectedCard: this.selectedCard
          }
        });
      } else {
        this.authService.loginForm()
      }
    })
  }

  onToggleDelete(productId: string, commentId: string) {
    this.store.dispatch(new DeleteComment({ productId, commentId }))
  }
}
