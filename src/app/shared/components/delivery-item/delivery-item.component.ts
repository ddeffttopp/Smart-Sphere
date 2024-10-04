import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-delivery-item',
  templateUrl: './delivery-item.component.html',
  styleUrls: ['./delivery-item.component.scss']
})
export class DeliveryItemComponent {
  @Input() icon!: string;
  @Input() method!: string;
  @Input() date!: string;
  @Input() price!: string;
  @Input() color: string = '#111111';
}
