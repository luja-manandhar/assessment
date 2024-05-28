import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductInterface } from '../models/product.interface';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly http: HttpClient) { }

  getProducts(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(environment.API_ENDPOINT+"/products");
  }

  getProduct(id: number): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(environment.API_ENDPOINT+"/get-product/"+id);
  }

  updateProduct(product: ProductInterface) {
    return this.http.post(environment.API_ENDPOINT+"/edit-product", product);
  }
}
