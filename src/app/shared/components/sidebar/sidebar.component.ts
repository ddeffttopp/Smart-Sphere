import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { isUserLogin, userInfo } from '../../../core/store/selectors/user.selectors';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../core/store/state/app.state';
import { AuthService } from '../../services/auth.service';
import { IUserState } from '../../../core/store/state/user.state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isUserLogin$: Observable<boolean> = this.store.select(isUserLogin);
  @Output() toggleSidenav = new EventEmitter<unknown>();
  showCatalog = false;
  mouseCatalog = false;
  mouseCatalogTrigger = false;
  userInfo!: IUserState;
  backgroundColor: string = '';
  hoverTimeout: any;

  constructor(
    private store: Store<IAppState>,
    public authService: AuthService
  ) {
  }

  ngOnInit() {
    this.store
      .select(userInfo)
      .pipe(untilDestroyed(this))
      .subscribe(user => {
        this.userInfo = user
        if (user?.name) {
          this.backgroundColor = this.authService.generateColor(user.name[0]);
        }
      });
  }

  onMouseEnter() {
    this.showCatalog = true;
    this.mouseCatalog = true;

    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
  }

  onMouseLeave() {
    this.mouseCatalog = false;
    this.startHideTimeout();
  }

  onCatalogMouseEnter() {
    this.mouseCatalogTrigger = true;
    this.showCatalog = true;

    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
  }

  onCatalogMouseLeave() {
    this.mouseCatalogTrigger = false;
    this.startHideTimeout();
  }

  startHideTimeout() {
    this.hoverTimeout = setTimeout(() => {
      if (!this.mouseCatalog && !this.mouseCatalogTrigger) {
        this.showCatalog = false;
      }
    }, 300);
  }
}
