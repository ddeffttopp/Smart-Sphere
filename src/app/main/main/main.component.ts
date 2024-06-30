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
      name: '',
      imgs: [''],
      price: '',
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
        }
      ],
      other: [
        {
          color: 'red'
        }
      ]
    }
  ]

}
