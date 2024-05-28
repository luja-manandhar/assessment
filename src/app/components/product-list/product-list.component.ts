import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { EMPTY, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProductInterface } from '../../models/product.interface';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';
import { HighlightProductDirective } from '../../directives/highlight-product.directive';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [AsyncPipe, CurrencyFormatPipe, HighlightProductDirective, RouterLink],
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
