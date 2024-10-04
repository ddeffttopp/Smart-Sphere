import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProductResponse } from '../../core/interfaces/product.interface';
import { environments } from '../../../environments';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {
  }

  public getProducts(): Observable<IProductResponse> {
    return this.http.get(`${environments.apiUrl}/products`) as Observable<IProductResponse>
  }
}
