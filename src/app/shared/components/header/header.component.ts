import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LikeBasketService} from '../../services/like-basket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isUserLogged: boolean | undefined;
  @Output() toggleSidebar = new EventEmitter<void>();
  likeCount: number = 0;
  basketCount: number = 0;

  constructor(private likeBasketService: LikeBasketService) {
  }

  ngOnInit() {
    this.likeBasketService.likeCount$.subscribe(count => this.likeCount = count);
    this.likeBasketService.basketCount$.subscribe(count => this.basketCount = count);
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
