import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BasketService } from '../../services/basket.service';
import { LikeService } from '../../services/like.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isUserLogin, userInfo } from '../../../core/store/selectors/user.selectors';
import { IAppState } from '../../../core/store/state/app.state';
import { AuthService } from '../../services/auth.service';
import { IUserState } from '../../../core/store/state/user.state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  likeCount: number = 0;
  basketCount: number = 0;
  isUserLogin$: Observable<boolean> = this.store.select(isUserLogin);
  userInfo!: IUserState;
  backgroundColor: string = '';

  constructor(
    private basketService: BasketService,
    private likeService: LikeService,
    public authService: AuthService,
    private store: Store<IAppState>
  ) {
  }

  ngOnInit() {
    this.likeService.likeCount$.subscribe(count => this.likeCount = count);
    this.basketService.basketItemsArray.subscribe(items => this.basketCount = items.length);
    this.store.select(userInfo).pipe(untilDestroyed(this)).subscribe(user => {
      this.userInfo = user
      if (user?.name) {
        this.backgroundColor = this.authService.generateColor(user.name[0]);
      }
    });
  }
}
