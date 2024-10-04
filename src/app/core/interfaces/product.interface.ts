import { IProductComment } from './comment.interface';
import { IProductCharacteristic } from './characteristic.interface';
import { IProductOtherId } from './otherId.interface';

export interface IProduct {
  id: string;
  name: string;
  images: string[];
  price: number;
  quantity: number;
  characteristic: IProductCharacteristic[];
  otherIds: IProductOtherId[];
  color: string;
  cssColor: string;
  comments: IProductComment[];
  guarantee: string
}

export type IProductResponse = [IProduct[], number];
