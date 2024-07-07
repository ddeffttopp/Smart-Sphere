import {Component} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  public productCards = [
    {
      id: 1,
      name: 'Ноутбук ASUS VivoBook 16',
      imgs: ['assets/product-image/laptop1.png', 'assets/product-image/laptop2.png', 'assets/product-image/laptop3.png', 'assets/product-image/laptop4.png'],
      price: 340,
      characteristics: [
        {
          name: '',
          value: 'ssss'
        }
      ],
      review: [
        {
          userName: '',
          userId: '',
          text: '',
          stars: 1
        },
        {
          userName: '',
          userId: '',
          text: '',
          stars: 2
        },
        {
          userName: '',
          userId: '',
          text: '',
          stars: 2
        }
      ],
      other: [
        {
          color: 'red'
        }
      ]
    }
  ]

  isSidebarVisible = false;
  public isUserLogged: boolean = false;

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
