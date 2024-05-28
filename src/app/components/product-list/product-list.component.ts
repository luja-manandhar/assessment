import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { EMPTY, Observable } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { ProductInterface } from '../../models/product.interface';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{
  private readonly servce = inject(ProductService);

  productList$: Observable<ProductInterface[]> = EMPTY;

  ngOnInit(): void {
      this.productList$ = this.servce.getProducts();
  }

}
