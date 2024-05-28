import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductInterface } from '../models/product.interface';
import { environment } from '../../environments/environment.development';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly http: HttpClient) { }

  getProducts(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(environment.API_ENDPOINT+"/products");
  }

  getProduct(id: number): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(environment.API_ENDPOINT+"/product/"+id);
  }

  updateProduct(product: ProductInterface) {
    return this.http.post(environment.API_ENDPOINT+"/edit-product", product);
  }

  createProduct(product: Partial<{ name: string | null, description: string | null, price: number | null }>) {
    return this.http.post(environment.API_ENDPOINT+"/add-product", product);
  }

  searchProduct(query: string) {
    const search = query.toLowerCase();
    return this.http.get<ProductInterface[]>(environment.API_ENDPOINT+"/products").pipe(
      map(res => res.filter(function(product){
        if(product.name.toLowerCase().includes(search) || product.description.toLowerCase().includes(search)) {
          return true;
        }
        return false;
      }))
    );
  }
}
